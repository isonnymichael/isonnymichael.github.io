import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Mail,
  MessageSquare,
  Send,
} from 'lucide-react'
import profilePicture from './assets/images/profile-picture.jpg'

const githubUsername = 'isonnymichael'
const githubToken = import.meta.env.VITE_GITHUB_TOKEN

const profileLinks = {
  github: `https://github.com/${githubUsername}`,
  linkedIn: 'https://www.linkedin.com/in/sonny-michael-95723512a/',
  email: 'mailto:isonnymichael@gmail.com',
  telegram: 'https://t.me/isonnymichael',
  discord: 'https://discord.com/users/isonnymichael',
}

const repositoryAvatar = 'https://avatars.githubusercontent.com/u/24585708?v=4'

const contributionUrls = [
  'https://github.com/KiiChain/kiijs-sdk/pull/36',
  'https://github.com/KiiChain/kiijs-sdk/pull/39',
  'https://github.com/KiiChain/kiijs-sdk/pull/44',
]

const deviconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const simpleIcons = 'https://cdn.simpleicons.org'
const iconify = 'https://api.iconify.design'

const stackRows = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: `${deviconBase}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${deviconBase}/typescript/typescript-original.svg` },
      { name: 'PHP', icon: `${deviconBase}/php/php-original.svg` },
      { name: 'Python', icon: `${deviconBase}/python/python-original.svg` },
      { name: 'Solidity', icon: `${deviconBase}/solidity/solidity-original.svg` },
      { name: 'C#', icon: `${deviconBase}/csharp/csharp-original.svg` },
      { name: 'C++', icon: `${deviconBase}/cplusplus/cplusplus-original.svg` },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: `${deviconBase}/react/react-original.svg` },
      { name: 'Vue', icon: `${deviconBase}/vuejs/vuejs-original.svg` },
      { name: 'Svelte', icon: `${deviconBase}/svelte/svelte-original.svg` },
      { name: 'Astro', icon: `${deviconBase}/astro/astro-original.svg` },
      { name: 'Tailwind', icon: `${deviconBase}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Vite', icon: `${deviconBase}/vitejs/vitejs-original.svg` },
    ],
  },
  {
    label: 'Framework',
    items: [
      { name: 'Node.js', icon: `${deviconBase}/nodejs/nodejs-original.svg` },
      { name: 'Express', icon: `${deviconBase}/express/express-original.svg` },
      { name: 'Next.js', icon: `${deviconBase}/nextjs/nextjs-original.svg` },
      { name: 'Laravel', icon: `${deviconBase}/laravel/laravel-original.svg` },
      { name: 'CakePHP', icon: `${deviconBase}/cakephp/cakephp-original.svg` },
      { name: 'Slim', icon: `${iconify}/logos/slim.svg` },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', icon: `${deviconBase}/postgresql/postgresql-original.svg` },
      { name: 'MySQL', icon: `${deviconBase}/mysql/mysql-original.svg` },
      { name: 'Redis', icon: `${deviconBase}/redis/redis-original.svg` },
      { name: 'Firebase', icon: `${deviconBase}/firebase/firebase-original.svg` },
    ],
  },
  {
    label: 'Web3',
    items: [
      { name: 'Hardhat', icon: `${deviconBase}/hardhat/hardhat-original.svg` },
      { name: 'Ethers.js', icon: `${simpleIcons}/ethers` },
      { name: 'Wagmi', icon: `${simpleIcons}/wagmi` },
      { name: 'OpenZeppelin', icon: `${simpleIcons}/openzeppelin` },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'Flutter', icon: `${deviconBase}/flutter/flutter-original.svg` },
      { name: 'Android', icon: `${deviconBase}/android/android-original.svg` },
    ],
  },
  {
    label: 'Game',
    items: [
      { name: 'Unity', icon: `${deviconBase}/unity/unity-original.svg` },
      { name: 'Cocos2dx', icon: `${simpleIcons}/cocos` },
      { name: 'Construct', icon: `${simpleIcons}/construct3` },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: `${deviconBase}/git/git-original.svg` },
      { name: 'GitHub', icon: `${deviconBase}/github/github-original.svg` },
      { name: 'GitLab', icon: `${deviconBase}/gitlab/gitlab-original.svg` },
      { name: 'Docker', icon: `${deviconBase}/docker/docker-original.svg` },
      { name: 'Vercel', icon: `${deviconBase}/vercel/vercel-original.svg` },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'AWS', icon: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'DigitalOcean', icon: `${deviconBase}/digitalocean/digitalocean-original.svg` },
      { name: 'Cloudflare', icon: `${deviconBase}/cloudflare/cloudflare-original.svg` },
      { name: 'Nginx', icon: `${deviconBase}/nginx/nginx-original.svg` },
      { name: 'Ubuntu', icon: `${deviconBase}/ubuntu/ubuntu-original.svg` },
    ],
  },
  {
    label: 'AI Tools',
    items: [
      { name: 'Claude Code', icon: `${simpleIcons}/anthropic` },
      { name: 'Cursor', icon: `${simpleIcons}/cursor` },
      { name: 'Copilot', icon: `${simpleIcons}/githubcopilot` },
    ],
  },
  {
    label: 'Team',
    items: [
      { name: 'Slack', icon: `${deviconBase}/slack/slack-original.svg` },
      { name: 'Trello', icon: `${deviconBase}/trello/trello-original.svg` },
      { name: 'Notion', icon: `${deviconBase}/notion/notion-original.svg` },
      { name: 'TeamCity', icon: `${simpleIcons}/teamcity` },
      { name: 'YouTrack', icon: `${iconify}/logos/youtrack.svg` },
    ],
  },
]

const socialItems = [
  {
    label: 'LinkedIn',
    desc: 'Professional profile & experience',
    color: 'bg-[#0077B5]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
      </svg>
    ),
    href: 'https://www.linkedin.com/in/isonnymichael/'
  },
  {
    label: 'Facebook',
    desc: 'Personal updates & community',
    color: 'bg-[#1877F2]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
      </svg>
    ),
    href: 'https://www.facebook.com/iSonnyMichael/'
  },
  {
    label: 'Instagram',
    desc: 'Lifestyle & visual content',
    color: 'bg-[#E4405F]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
      </svg>
    ),
    href: 'https://www.instagram.com/isonnymichael/'
  },
  {
    label: 'Twitter',
    desc: 'Thoughts, tech & updates',
    color: 'bg-black',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM457.1 180L353.3 298.6L475.4 460L379.8 460L305 362.1L219.3 460L171.8 460L282.8 333.1L165.7 180L263.7 180L331.4 269.5L409.6 180L457.1 180zM419.3 431.6L249.4 206.9L221.1 206.9L392.9 431.6L419.3 431.6z" />
      </svg>
    ),
    href: 'https://x.com/isonnymichael'
  },
  {
    label: 'YouTube',
    desc: 'Programming & tech videos',
    color: 'bg-[#FF0000]',
    icon: (
      <svg viewBox="0 0 576 512" fill="currentColor">
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.2-48.5-48.5C458.4 64 288 64 288 64S117.6 64 74.8 75.6c-23.7 6.3-42.2 24.8-48.5 48.5C16 166.9 16 256 16 256s0 89.1 10.3 131.9c6.3 23.7 24.8 42.2 48.5 48.5C117.6 448 288 448 288 448s170.4 0 213.2-11.6c23.7-6.3 42.2-24.8 48.5-48.5C560 345.1 560 256 560 256s0-89.1-10.3-131.9zM232 334.7V177.3L361 256 232 334.7z" />
      </svg>
    ),
    href: 'https://www.youtube.com/@isonnymichael'
  },
  {
    label: 'TikTok',
    desc: 'Short tech & creative content',
    color: 'bg-black',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
      </svg>
    ),
    href: 'https://www.tiktok.com/@isonnymichael'
  },
  {
    label: 'GitHub',
    desc: 'Open source & repositories',
    color: 'bg-slate-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" />
      </svg>
    ),
    href: 'https://github.com/isonnymichael'
  },
  {
    label: 'NPM',
    desc: 'Published packages & libraries',
    color: 'bg-[#CB3837]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640   640" fill="currentColor">
        <path d="M320 352L288 352L288 288L320 288L320 352zM608 224L608 416L320 416L320 448L192 448L192 416L32 416L32 224L608 224zM192 256L64 256L64 384L128 384L128 288L160 288L160 384L192 384L192 256zM352 256L224 256L224 416L288 416L288 384L352 384L352 256zM576 256L384 256L384 384L448 384L448 288L480 288L480 384L512 384L512 288L544 288L544 384L576 384L576 256z" />
      </svg>
    ),
    href: 'https://www.npmjs.com/~isonnymichael'
  },
  {
    label: 'Base',
    desc: 'Web3 social platform',
    color: 'bg-blue-500',
    icon: (
      <svg viewBox="0 0 512 512" fill="currentColor">
        <circle cx="256" cy="256" r="200" />
      </svg>
    ),
    href: 'https://base.app/profile/0x2B36425Aa21B034045876853DaA93f82f1357116?tab=posts'
  }
];

const languageColorMap = {
  PHP: '#5f6ac4',
  Vue: '#42d392',
  JavaScript: '#facc15',
  Python: '#1f6feb',
  TypeScript: '#3178c6',
  HTML: '#f97316',
  CSS: '#38bdf8',
  Svelte: '#ff3e00',
  Hack: '#9ca3af',
  Solidity: '#6b7280',
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const RESET_STATE = { y: 0, scaleX: 1, scaleY: 1, scale: 1, rotate: 0 }
const RESET_TRANSITION = { duration: 0.22, ease: 'easeOut' }

function HoverAnimCard({ tag = 'a', hoverAnim, hoverTransition, className, children, ...props }) {
  const controls = useAnimation()
  const MotionTag = motion[tag]
  return (
    <MotionTag
      animate={controls}
      initial={RESET_STATE}
      onHoverStart={() => controls.start({ ...hoverAnim, transition: hoverTransition })}
      onHoverEnd={() => { controls.stop(); controls.start({ ...RESET_STATE, transition: RESET_TRANSITION }) }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

function StackItem({ item, rowLabel }) {
  const [showTip, setShowTip] = useState(false)
  return (
    <div
      className="relative -ml-2 first:ml-0 transition-[margin] duration-200 ease-out group-hover:ml-1"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      style={{ zIndex: showTip ? 20 : 1 }}
    >
      <motion.img
        src={item.icon}
        alt={item.name}
        whileHover={{ scale: 1.3, y: -5 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
        className="h-7 w-7 rounded-sm border-2 border-white bg-white p-0.5 shadow-sm"
        loading="lazy"
      />
      <AnimatePresence>
        {showTip && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.82 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-white shadow-lg"
          >
            {item.name}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-shimmer relative rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-slate-200" />
      <div className="h-4 w-3/4 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
      <div className="mt-1 h-3 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-12 rounded bg-slate-200" />
        <div className="h-3 w-12 rounded bg-slate-200" />
      </div>
      <div className="mt-3 h-1.5 w-full rounded bg-slate-200" />
    </div>
  )
}

function App() {
  const MotionMain = motion.main
  const [profileData, setProfileData] = useState({
    name: 'Sonny Michael Wijaya',
    ...profileLinks,
  })
  const [languageItems, setLanguageItems] = useState([])
  const [repoCards, setRepoCards] = useState([])
  const [contributionCards, setContributionCards] = useState([])
  const [commitDots, setCommitDots] = useState(Array.from({ length: 371 }, () => 0))
  const [repoSlideIndex, setRepoSlideIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const REPO_CARDS_PER_PAGE = 3

  useEffect(() => {
    const githubHeaders = githubToken
      ? {
        Authorization: `Bearer ${githubToken}`,
      }
      : undefined

    const parsePullUrl = (url) => {
      const parts = new URL(url).pathname.split('/').filter(Boolean)
      return { owner: parts[0], repo: parts[1], number: parts[3] }
    }

    const loadGitHubData = async () => {
      setIsLoading(true)
      try {
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, {
          headers: githubHeaders,
        })
        const user = userResponse.ok ? await userResponse.json() : null
        if (user) {
          setProfileData({
            name: user.name || 'Sonny Michael Wijaya',
            ...profileLinks,
          })
        }

        const allRepos = []
        let page = 1
        while (true) {
          const repoResponse = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?per_page=100&page=${page}&sort=updated`,
            { headers: githubHeaders },
          )
          const repoJson = repoResponse.ok ? await repoResponse.json() : []
          if (!Array.isArray(repoJson) || repoJson.length === 0) {
            break
          }
          allRepos.push(...repoJson)
          if (repoJson.length < 100) {
            break
          }
          page += 1
        }

        const normalizedRepos = allRepos
          .filter((repo) => !repo.fork && repo.visibility === 'public')
          .map((repo) => ({
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || 'No description',
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            issues: repo.open_issues_count || 0,
            contributors: 1,
            url: repo.html_url,
            avatarUrl: repo.owner?.avatar_url || repositoryAvatar,
            languagesUrl: repo.languages_url,
          }))
          .sort((first, second) => second.stars - first.stars)

        setRepoCards(normalizedRepos)

        const languageResponses = await Promise.all(
          normalizedRepos.map((repo) => fetch(repo.languagesUrl, { headers: githubHeaders })),
        )
        const languageJsonList = await Promise.all(
          languageResponses.map((response) => (response.ok ? response.json() : {})),
        )

        const languageTotals = languageJsonList.reduce((accumulator, repoLanguages) => {
          Object.entries(repoLanguages || {}).forEach(([name, bytes]) => {
            accumulator[name] = (accumulator[name] || 0) + bytes
          })
          return accumulator
        }, {})

        const totalBytes = Object.values(languageTotals).reduce((sum, value) => sum + value, 0)
        const mappedLanguages = Object.entries(languageTotals)
          .sort((first, second) => second[1] - first[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            usage: totalBytes > 0 ? `${((bytes / totalBytes) * 100).toFixed(1)}%` : '0%',
          }))
        setLanguageItems(mappedLanguages)

        const contributionPromises = contributionUrls.map(async (url) => {
          const { owner, repo, number } = parsePullUrl(url)
          const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${number}`, {
            headers: githubHeaders,
          })
          const pr = response.ok ? await response.json() : null
          if (!pr) {
            return null
          }

          return {
            repoFullName: `${owner}/${repo}`,
            number,
            title: pr.title,
            url: pr.html_url,
            merged: pr.state === 'closed' && !!pr.merged_at,
            comments: (pr.comments || 0) + (pr.review_comments || 0),
            files: pr.changed_files || 0,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
            commits: pr.commits || 1,
            authorLogin: pr.user?.login || owner,
            authorAvatar: pr.user?.avatar_url || null,
            updatedAt: pr.updated_at,
          }
        })

        const contributions = (await Promise.all(contributionPromises)).filter(Boolean)
        setContributionCards(contributions)

        if (githubToken) {
          const graphResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${githubToken}`,
            },
            body: JSON.stringify({
              query: `query($login: String!) {
                user(login: $login) {
                  contributionsCollection {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }`,
              variables: { login: githubUsername },
            }),
          })

          const graphJson = graphResponse.ok ? await graphResponse.json() : null
          const weeks = graphJson?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
          const calendarDots = weeks
            .flatMap((week) => week.contributionDays || [])
            .map((day) => day.contributionCount)
          if (calendarDots.length > 0) {
            setCommitDots(calendarDots.slice(-371))
          }
        } else {
          const eventResponse = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`)
          const events = eventResponse.ok ? await eventResponse.json() : []
          const eventsByDay = events.reduce((accumulator, event) => {
            const key = event.created_at.slice(0, 10)
            accumulator[key] = (accumulator[key] || 0) + 1
            return accumulator
          }, {})
          const today = new Date()
          const dots = Array.from({ length: 371 }, (_, index) => {
            const day = new Date(today)
            day.setDate(today.getDate() - (370 - index))
            const key = day.toISOString().slice(0, 10)
            return eventsByDay[key] || 0
          })
          setCommitDots(dots)
        }
      } catch {
        setLanguageItems([
          { name: 'JavaScript', usage: '0.0%' },
          { name: 'TypeScript', usage: '0.0%' },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  const languageSegments = languageItems.map((item) => ({
    ...item,
    numeric: Number.parseFloat(item.usage),
    color: languageColorMap[item.name] || '#94a3b8',
  }))

  const leftLanguageList = languageSegments.filter((_, index) => index % 2 === 0)
  const rightLanguageList = languageSegments.filter((_, index) => index % 2 === 1)

  const totalRepoPages = Math.ceil(repoCards.length / REPO_CARDS_PER_PAGE)
  const visibleRepos = repoCards.slice(
    repoSlideIndex * REPO_CARDS_PER_PAGE,
    (repoSlideIndex + 1) * REPO_CARDS_PER_PAGE,
  )

  const handleRepoPrev = () => {
    setSlideDirection(-1)
    setRepoSlideIndex((i) => Math.max(0, i - 1))
  }

  const handleRepoNext = () => {
    setSlideDirection(1)
    setRepoSlideIndex((i) => Math.min(totalRepoPages - 1, i + 1))
  }

  const monthMarkers = Array.from({ length: 13 }, (_, index) => {
    const day = new Date()
    day.setDate(day.getDate() - (364 - index * 28))
    return { label: monthNames[day.getMonth()], colStart: index * 4 + 1 }
  })

  return (
    <MotionMain
      className="relative min-h-screen overflow-hidden bg-white text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid-bg absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-4 px-4 py-5 md:grid-cols-[320px_1fr] md:px-6">
        <aside className="rounded-xl border border-slate-200 bg-white h shadow-[0_12px_40px_-30px_rgba(15,23,42,0.32)]">
          <div className="h-24 rounded-t-xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />
          <div className="px-5 pb-5">
            <div className="-mt-14 flex justify-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-200">
                <img src={profilePicture} alt={profileData.name} className="h-full w-full object-cover" />
              </div>
            </div>
            <h1 className="mt-3 text-center text-2xl font-semibold text-slate-900">{profileData.name}</h1>
            <p className="mt-1 text-center text-sm text-slate-500">Let&apos;s connect and change the world!</p>

            <a
              href={profileLinks.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block rounded-lg border border-slate-200 p-3 hover:border-blue-400 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-blue-600">Most Used Languages</p>
                <ExternalLink size={14} className="text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <div className="flex h-full w-full">
                  {languageSegments.map((item) => (
                    <span
                      key={`segment-${item.name}`}
                      className="h-full"
                      style={{ width: `${item.numeric}%`, backgroundColor: item.color }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {leftLanguageList.map((item) => (
                  <p key={`left-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name} {item.usage}
                  </p>
                ))}
                {rightLanguageList.map((item) => (
                  <p key={`right-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name} {item.usage}
                  </p>
                ))}
              </div>
            </a>

            <section className="mt-4 rounded-lg border border-slate-200 p-3">
              <p className="text-lg font-semibold text-blue-600">Things I code with</p>
              <div className="mt-3 space-y-3">
                {stackRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[84px_1fr] gap-2 text-xs">
                    <p className="font-medium text-slate-600">{row.label}</p>
                    <div className="group flex flex-wrap items-center">
                      {row.items.map((item) => (
                        <StackItem key={`${row.label}-${item.name}`} item={item} rowLabel={row.label} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <main className="space-y-4">
          <SectionCard title="Contributions">
            <div className="grid gap-2 md:grid-cols-3">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skeleton-contribution-${i}`} />)
                : contributionCards.map((c) => {
                  const total = c.additions + c.deletions || 1
                  const addSquares = Math.round((c.additions / total) * 5)
                  const delSquares = 5 - addSquares
                  const date = new Date(c.updatedAt)
                  const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                  return (
                    <HoverAnimCard
                      key={`contribution-${c.repoFullName}-${c.number}`}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col rounded-md border border-slate-200 bg-white"
                      hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                      hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
                    >
                      <div className="flex flex-1 flex-col gap-1.5 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[11px] text-slate-400">{c.repoFullName}</p>
                          <Code2 size={13} className="mt-0.5 shrink-0 text-slate-400" />
                        </div>

                        <p className="text-sm font-semibold leading-snug text-slate-800">
                          #{c.number} {c.title}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" /></svg>
                            {c.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 2.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25h-6.5a.75.75 0 0 0-.53.22L4.5 14.19v-2.44a.75.75 0 0 0-.75-.75h-2a.25.25 0 0 1-.25-.25Zm.25-1.75C.784 1 0 1.784 0 2.75v8.5C0 12.216.784 13 1.75 13H3v1.543a1.458 1.458 0 0 0 2.487 1.03L7.81 13.5h6.44A1.75 1.75 0 0 0 16 11.75v-9A1.75 1.75 0 0 0 14.25 1Z" /></svg>
                            1 review
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" /></svg>
                            {c.files}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <span className="text-emerald-600">+{c.additions}</span>
                            <span className="text-red-500">-{c.deletions}</span>
                            <span className="flex gap-px">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className="h-2.5 w-2.5 rounded-[2px]"
                                  style={{ backgroundColor: i < addSquares ? '#16a34a' : i < addSquares + delSquares ? '#dc2626' : '#e2e8f0' }}
                                />
                              ))}
                            </span>
                          </span>
                        </div>

                        <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] text-slate-500">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorLogin}
                            className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                          />
                          <span className="font-medium text-slate-700">{c.authorLogin}</span>
                          <span>•</span>
                          <span>{dateStr}</span>
                          <span>•</span>
                          <span>{c.commits} commit{c.commits !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className="h-1 w-full rounded-b-md bg-gradient-to-r from-lime-400 via-yellow-400 via-orange-400 to-red-500" />
                    </HoverAnimCard>
                  )
                })}
            </div>
          </SectionCard>

          <SectionCard title="Commits">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <div className="mb-2 grid grid-cols-53 gap-1 text-xs text-slate-600">
                {monthMarkers.map((marker) => (
                  <span
                    key={`${marker.label}-${marker.colStart}`}
                    className="col-span-4"
                    style={{ gridColumnStart: marker.colStart }}
                  >
                    {marker.label}
                  </span>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {commitDots.map((value, index) => {
                  const opacity = value === 0 ? 0.07 : Math.min(0.85, 0.22 + value * 0.12)
                  return (
                    <span
                      key={`dot-${index}`}
                      className="h-2.5 w-2.5 rounded-[2px] border border-emerald-100/60"
                      style={{ backgroundColor: `rgba(22,163,74,${opacity})` }}
                    />
                  )
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Total Contributions: {commitDots.reduce((a, b) => a + b, 0)}</span>
                <span className="flex items-center gap-1.5">
                  Less
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-100" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-300" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-700" />
                  More
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Repositories">
            <div className="relative overflow-hidden">
              {isLoading ? (
                <div className="grid gap-2 md:grid-cols-3">
                  {Array.from({ length: REPO_CARDS_PER_PAGE }).map((_, i) => (
                    <SkeletonCard key={`skeleton-repo-${i}`} />
                  ))}
                </div>
              ) : (
                <>
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={repoSlideIndex}
                      custom={slideDirection}
                      variants={{
                        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="grid gap-2 md:grid-cols-3"
                    >
                      {visibleRepos.map((repo) => (
                        <HoverAnimCard
                          key={repo.name}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="relative block rounded-md border border-slate-200 bg-white p-3"
                          hoverAnim={{ scaleX: [1, 1.12, 0.92, 1.04, 0.98, 1], scaleY: [1, 0.88, 1.08, 0.96, 1.02, 1] }}
                          hoverTransition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' }}
                        >
                          <img
                            src={repo.avatarUrl}
                            alt={repo.name}
                            className="absolute right-3 top-3 h-8 w-8 rounded-full border border-slate-200 object-cover"
                          />
                          <p className="text-sm font-semibold text-slate-800">{repo.name}</p>
                          <p className="mt-1 line-clamp-2 pr-10 text-xs text-slate-500">{repo.description}</p>
                          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                            <span>★ {repo.stars === 0 ? '' : repo.stars}</span>
                            <span>⑂ {repo.forks === 0 ? '' : repo.forks}</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded bg-gradient-to-r from-blue-500 via-sky-500 via-orange-500 to-pink-500" />
                        </HoverAnimCard>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={handleRepoPrev}
                      disabled={repoSlideIndex === 0}
                      className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div className="flex gap-1.5">
                      {Array.from({ length: totalRepoPages }).map((_, i) => (
                        <button
                          key={`dot-${i}`}
                          onClick={() => {
                            setSlideDirection(i > repoSlideIndex ? 1 : -1)
                            setRepoSlideIndex(i)
                          }}
                          className={`h-1.5 rounded-full transition-all ${i === repoSlideIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                            }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleRepoNext}
                      disabled={repoSlideIndex >= totalRepoPages - 1}
                      className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Social">
            <div className="grid gap-2 md:grid-cols-3">
              {socialItems.map((item) => (
                <HoverAnimCard
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${item.color} rounded-md p-3 text-white`}
                  hoverAnim={{ scale: [1, 1.08, 0.95, 1.03, 0.98, 1], rotate: [0, -2, 2, -1, 1, 0] }}
                  hoverTransition={{ duration: 0.5, times: [0, 0.15, 0.35, 0.55, 0.75, 1], ease: 'easeInOut' }}
                >
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <span className="w-[24px] h-[24px] flex items-center justify-center">
                      {item.icon}
                    </span>
                    {item.label}
                  </p>
                  <p className="text-xs opacity-90">{item.desc}</p>
                </HoverAnimCard>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Contact">
            <div className="grid gap-2 md:grid-cols-3">
              <HoverAnimCard
                href={profileData.email}
                className="rounded-md bg-sky-600 p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Mail size={14} />
                  Email
                </p>
                <p className="text-xs opacity-90">isonnymichael@gmail.com</p>
              </HoverAnimCard>
              <HoverAnimCard
                href={profileData.telegram}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#229ED9] p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Send size={14} />
                  Telegram
                </p>
                <p className="text-xs opacity-90">t.me/isonnymichael</p>
              </HoverAnimCard>
              <HoverAnimCard
                href={profileData.discord}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#5865F2] p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <MessageSquare size={14} />
                  Discord
                </p>
                <p className="text-xs opacity-90">discord.com/users/isonnymichael</p>
              </HoverAnimCard>
            </div>
          </SectionCard>
        </main>
      </div>

    </MotionMain>
  )
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
        <p className="text-lg font-medium text-slate-800">{title}</p>
        {title !== 'Social' && title !== 'Contact' && (
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-1 hover:bg-slate-100 transition-colors"
            title="View on GitHub"
          >
            <ExternalLink size={14} className="text-slate-400" />
          </a>
        )}
      </div>
      {children}
    </section>
  )
}

export default App
