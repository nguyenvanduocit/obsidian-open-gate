---
layout: home

hero:
  name: "Open Gate"
  text: "Embed any website in to Obsidian"
  tagline: "Anything you need, right where you need it"
  actions:
    - theme: brand
      text: Direct Install
      link: https://obsidian.md/plugins?id=open-gate
    - theme: alt
      text: Tutorial
      link: /introduction

  image:
    src: /logo.webp
    alt: VitePress

features:
  - title: Dedicated View
    icon: 🖼️
    details: Any website can be opened in a dedicated view
  - title: Inline View
    icon: 📄
    details: Or can be embedded directly in a note
  - title: Gate Linking
    icon: 🔗
    details: Click on a link to open this website inside Obsidian
  - title: Custom CSS
    icon: 🎨
    details: Inject custom CSS to match the look and feel of Obsidian
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/1256953?v=4?s=100',
    name: 'Nguyễn Văn Được',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/nguyenvanduocit' },
      { icon: 'twitter', link: 'https://twitter.com/duocdev' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/4482878?v=4?s=100',
    name: 'Andrew McGivery',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/andrewmcgivery' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/617020?v=4?s=100',
    name: 'Digital Alchemist',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/miztizm' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/108629034?v=4?s=100',
    name: 'Liam Swayne',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/LiamSwayne' }
    ]
  }
]
</script>

## Contributers

Thanks to all the people who have contributed!

<VPTeamPage>
  <VPTeamMembers :members="members" />
</VPTeamPage>


<style>
.VPTeamPage {
  margin-top: 40px !important;
}
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
