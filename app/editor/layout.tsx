import { EditorProvider } from '@/context/editor-context'

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EditorProvider>{children}</EditorProvider>
} 