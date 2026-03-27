import { motion } from 'framer-motion'
import { useGitHubData } from './hooks/useGitHubData'
import Sidebar from './components/Sidebar'
import ContributionsSection from './components/ContributionsSection'
import CommitsSection from './components/CommitsSection'
import RepositoriesSection from './components/RepositoriesSection'
import SocialSection from './components/SocialSection'
import ContactSection from './components/ContactSection'

function App() {
  const { profileData, languageItems, repoCards, contributionCards, commitDots, isLoading } =
    useGitHubData()

  return (
    <motion.main
      className="relative min-h-screen overflow-x-hidden bg-white text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid-bg absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-4 px-4 py-5 md:grid-cols-[320px_1fr] md:items-start md:px-6">
        <div className="md:sticky md:top-5">
          <Sidebar profileData={profileData} languageItems={languageItems} />
        </div>

        <div className="space-y-4">
          <ContributionsSection contributionCards={contributionCards} isLoading={isLoading} />
          <CommitsSection commitDots={commitDots} />
          <RepositoriesSection repoCards={repoCards} isLoading={isLoading} />
          <SocialSection />
          <ContactSection profileData={profileData} />
        </div>
      </div>
    </motion.main>
  )
}

export default App
