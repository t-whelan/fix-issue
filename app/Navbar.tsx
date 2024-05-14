'use client'
import React from 'react'
import Link from 'next/link'
import { Bug } from 'lucide-react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { DropdownMenu, Avatar } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const Navbar = () => {
   
  return (
    <header className='mx-4 border-b py-2 flex items-center justify-between'>
        <NavLink />

        <nav>
        <AuthMenu />
        </nav>
    </header>
  )
}

export default Navbar

const NavLink = ()=>{
  const links = [{id:1, label:'Dashboard', href:'/dashboard'}, {id:2, label:'Issues', href:'/issues/view'}]
  const currentPath = usePathname();
return(
  <nav className='flex gap-4 items-center'>
        <Link href="/"><Bug /></Link>

        <ul className='flex items-center gap-4'>
        {links.map((item)=>(
            <li key={item.id}><Link href={item.href} className={classNames({
                "text-gray-900": currentPath === item.href,
                "text-gray-500":currentPath !== item.href,
                "hover:text-purple-800 transition-all": true
            })}>{item.label}</Link></li>
        ))}
        </ul>
        </nav> 
)
}

const AuthMenu = ()=>{
  const {data:session, status} = useSession();

  if(status==='loading') return <Skeleton width="3rem" />

  if(status === 'unauthenticated') return <Link href="/api/auth/signin">Signin</Link>
  return(
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
      <Avatar
          src={session!.user!.image! }
          fallback="A"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
                          <DropdownMenu.Item>
                            {session!.user?.email}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                          <Link href='/api/auth/signout' className='text-gray-800'>Signout</Link>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}