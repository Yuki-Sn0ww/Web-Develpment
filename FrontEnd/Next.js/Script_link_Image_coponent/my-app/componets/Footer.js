import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <ul className='flex gap-4'>
        <li><Link href="/">home</Link></li>
        <li><Link href ="/about">about</Link></li>
        <li><Link href ="/contact">contact</Link></li>
      </ul>
    </div>
  )
}

export default Footer
