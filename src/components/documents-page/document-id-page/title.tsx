import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { TDocument, useDocuments } from "@/hooks/use-documents"
import { Emoji } from "emoji-picker-react"
import { useRef, useState } from "react"

type TitleProps = {
  initialData: TDocument
}

export const Title = ({
  initialData
}:TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData.title || "Untitled")
  const [isEditing, setIsEditing] = useState(false)

  const {updateTitle} = useDocuments();

  const enableInput = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
    updateTitle(initialData.id, title)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    // handle update title
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      disableInput();
    }
  }

  return <div className="flex items-center gap-x-1">
    {!!initialData.icon &&  <Emoji unified={initialData.icon} size={16}/>}
    {isEditing ? (
      <Input ref={inputRef} onClick={enableInput}
      onBlur={disableInput}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={title}
      className="h-7 px-2 focus-visible:ring-transparent"/>
    ):(
      <Button onClick={enableInput} variant="ghost" size="sm" className="font-normal h-auto p-1">
        <span className="truncate">
          {initialData?.title}
          </span>
      </Button>
    )}
  </div>
}

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="h-9 w-20 rounded-md" />
  )
}