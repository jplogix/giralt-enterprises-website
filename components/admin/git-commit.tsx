'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GitBranch, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface GitCommitProps {
  onSuccess?: () => void
}

export function GitCommit({ onSuccess }: GitCommitProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [commitUrl, setCommitUrl] = useState('')

  const handleCommit = async () => {
    if (!message.trim()) {
      setError('Commit message is required')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/admin/git/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.configured === false) {
          throw new Error('GitHub integration is not configured. Changes are saved locally but not committed to git.')
        }
        throw new Error(data.error || 'Failed to commit changes')
      }

      setSuccess(true)
      setCommitUrl(data.commit?.url || '')
      toast.success('Changes committed to git successfully!')
      
      if (onSuccess) {
        onSuccess()
      }

      // Reset after a delay
      setTimeout(() => {
        setOpen(false)
        setMessage('')
        setSuccess(false)
        setCommitUrl('')
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to commit changes'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full"
      >
        <GitBranch className="h-4 w-4 mr-2" />
        Commit Changes to Git
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Commit Changes to Git</DialogTitle>
            <DialogDescription>
              Commit your changes to trigger a Vercel deployment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Changes committed successfully!
                  {commitUrl && (
                    <a
                      href={commitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline"
                    >
                      View commit
                    </a>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="commit-message">Commit Message</Label>
              <Input
                id="commit-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Update gallery images"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !loading) {
                    e.preventDefault()
                    handleCommit()
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                This will commit changes to the repository and trigger a Vercel deployment
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false)
                setMessage('')
                setError('')
                setSuccess(false)
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleCommit} disabled={loading || !message.trim()}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Committing...
                </>
              ) : (
                'Commit'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

