import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

function PostAction({ icon, text, onClick }: Props) {
  return (
    <button className='flex items-center' onClick={onClick}>
      <span className='mr-1'>{icon}</span>
      <span className='hidden sm:inline'>{text}</span>
    </button>
  )
}

export default PostAction