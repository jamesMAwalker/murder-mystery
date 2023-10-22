import { IDropdownContent } from "./types";

import {
  AlertIcon,
  GuessIcon,
  HomeIcon,
  HowToIcon,
  NotesIcon,
  ProfileIcon,
  StoryIcon,
  SuspectIcon
} from '../../(components)';

export const pages: IDropdownContent[] = [
  { pageKey: 'home', pageTitle: 'Home', path: '/', icon: <HomeIcon /> },
  { pageKey: 'story', pageTitle: 'Story', path: '/background', icon: <StoryIcon /> },
  { pageKey: 'howto', pageTitle: 'How-to', path: '/instructions', icon: <HowToIcon /> },
  { pageKey: 'notes', pageTitle: 'Notes', path: '/notes', icon: <NotesIcon /> },
  {
    pageKey: 'suspects',
    pageTitle: 'Suspects',
    path: '/suspects',
    icon: <SuspectIcon />
  },
  { pageKey: 'news', pageTitle: 'News', path: '/reports', icon: <AlertIcon /> },
  {
    pageKey: 'profile',
    pageTitle: 'Profile',
    path: '/user-profile',
    icon: <ProfileIcon />
  },
  { pageKey: 'guess', pageTitle: 'Guess! ', path: '/submit-guess', icon: <GuessIcon /> },
  { pageKey: 'admin', pageTitle: 'Admin', path: '/admin', icon: <GuessIcon /> },
  {
    pageKey: 'script',
    pageTitle: 'Script',
    path: '/suspect-dashboard',
    icon: <GuessIcon />
  }
]
