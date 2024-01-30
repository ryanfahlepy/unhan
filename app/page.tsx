import React from 'react'


import Landing from '@/components/Home/landing'
import Logo from '@/components/Home/logo'
import Rank from '@/components/Home/rank'
import StudyProgram from '@/components/Home/studyprogram'

const Home = () => {
  const title = "Kadet Mahasiswa"
  return (
    <>
      <title>{title}</title>
      <Landing />
      <Logo />
      <Rank />
      <StudyProgram />
    </>
  )
}
export default Home;