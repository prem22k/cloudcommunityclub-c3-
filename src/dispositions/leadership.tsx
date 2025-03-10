/*

    ! NOTICE: Per leader dict entry, follow this key order. Leave each string value empty if not applicable.
        'role': 'Projects Manager',
        'imgSrc': pfp_projectmanager,
        'quote': (<p>This is for the record. History is written by the victor. History is filled with liars.</p>),
        SOCIALS START HERE
        'linktree': 'https://www.linktr.ee/devalto',
        'instagram': 'https://www.instagram.com/dev_alto',
        'discord': 'https://discordapp.com/users/691359092136083457',
        'github': 'https://www.github.com/dev-alto',
        'linkedin': 'https://www.linkedin.com/in/lance-ruiz',
        'website': 'https://the-devalto-experiments.000webhostapp.com/'

*/

// TODO prepare to add yearly leaderships

import { BiCrown } from 'react-icons/bi'
import { CgCrown } from 'react-icons/cg'
import { GrMoney } from 'react-icons/gr'

import { FaRegHandPeace } from 'react-icons/fa'
import { LuConstruction } from 'react-icons/lu'

import { AiOutlineGlobal } from 'react-icons/ai'

import { PiFeatherDuotone, PiHandshakeBold } from 'react-icons/pi'

const dir_leaderPortraits = '/assets/home/leader_portraits/'

const pfp_president = dir_leaderPortraits + 'nandhanrao.png'
const pfp_vicepresident = dir_leaderPortraits + 'nikhilanand.png'
const pfp_secretary = dir_leaderPortraits + 'vasalaharshitha.png'
const pfp_community = dir_leaderPortraits + 'vamanakhil.png'
const pfp_technical = dir_leaderPortraits + 'sathwik.png'
const pfp_rdhead = dir_leaderPortraits + 'harshanvarma.png'
const pfp_organizing = dir_leaderPortraits + 'santoshkammari.png'
const pfp_designing = dir_leaderPortraits + 'sivamaruthi.png'
const pfp_marketing = dir_leaderPortraits + 'vasundara.png'
const pfp_document = dir_leaderPortraits + 'bhargavi.png'
const pfp_none = dir_leaderPortraits + 'noprofile.webp'
const pfp_webmaster = dir_leaderPortraits + 'premsai.jpg'  // Make sure to add your image to this directory
const pfp_publicity = dir_leaderPortraits + 'goneeeshita.jpeg'
export const FALLBACK_QUOTE = (
    <p>
        That was no message. <i>This</i> is a message.
    </p>
)

export const leadership = {
    major: {
        'Nandhan Rao': {
            role: 'President',
            imgSrc: pfp_president,
            quote: (
                <p>
                    Power resides where men believe it resides
                    - R.R.Martin
                </p>
            ),
            linktree: '',
            instagram: 'https://www.instagram.com/nandhan_rao_?igsh=MTM1cDh0b3N0MXBiOA%3D%3D&utm_source=qr',
            discord: 'https://discord.gg/Jxk6Yzhh',
            github: '',
            linkedin: 'https://www.linkedin.com/in/nandhan-rao-12345abc/',
            website: '',
            icon: <BiCrown />,
        },
        'Nikhil Anand': {
            role: 'Vice President',
            imgSrc: pfp_vicepresident,
            quote: <p>The future is digital.</p>,
            instagram: 'https://www.instagram.com/_nikhillanand/',
            github: 'https://github.com/NIKHIL-CAT',
            linkedin: 'https://www.linkedin.com/in/nikhil-anand-94948a25a/',
            icon: <CgCrown />,
        },
        'Harshitha V': {
            role: 'General Secretary',
            imgSrc: pfp_secretary,
            quote: (
                <p>
                    Building, Breaking and Learning.
                </p>
            ),
            linkedin: 'https://www.linkedin.com/in/vasala-harshitha-bb15952a3/',
            icon: <PiFeatherDuotone />,
        },
        'Vaman Akhil': {
            role: 'Community Manager',
            imgSrc: pfp_community,
            quote: (
                <p>
                    "Building bridges between ideas and innovation."
                </p>
            ),
            instagram: 'https://www.instagram.com/vamanakhil/',
            github: 'https://github.com/Vamanakhil',
            linkedin: 'https://www.linkedin.com/in/vaman-akhil-b47604243/',
            website: 'https://akhilon.dev/',
            icon: <FaRegHandPeace />,
        },
        'Sathwik': {
            role: 'Technical Head',
            imgSrc: pfp_technical,
            quote: (
                <p>
                   IT'S NEVER TOO LATE TO DREAM.
                </p>
            ),
            linktree: 'https://linktr.ee/sathwikbodakuntla',
            icon: <LuConstruction />,
        },
        'Harshan Varma': {
            role: 'Research & Development Head',
            imgSrc: pfp_rdhead,
            quote: ( 
                <p>
                    One who rules with his left rules the world
                </p>
            ),
            instagram: 'https://www.instagram.com/varma_harshan/',
            linkedin: 'https://www.linkedin.com/in/harshanvarma17/',
            icon: <PiHandshakeBold />,
        },
        'Santosh': {
            role: 'Organizing Head',
            imgSrc: pfp_organizing,
            quote: 'Behind the scenes, ahead of the game.',
            linkedin: 'https://www.linkedin.com/in/kammari-santosh-kumar',
            icon: <PiHandshakeBold />,
        },
        'T Siva Maruthi Ganesh': {
            role: 'Designing Head',
            imgSrc: pfp_designing,
            quote: 'One step at a time.',
            instagram: 'https://www.instagram.com/tsmg_125/',
            linkedin: 'https://www.linkedin.com/in/maruthi-ganesh-929988258/',
            icon: <PiHandshakeBold />,
        },
         'B Vasundara': {
             role: 'Marketing Head',
             imgSrc: pfp_marketing,
             quote: 'To let the brain work without sufficient material is like racing an engine. It racks itself to pieces.',
             instagram: 'https://www.instagram.com/bv_894',
             linkedin: 'https://www.linkedin.com/in/b-vasundara-678b86253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
             icon: <PiHandshakeBold />,
         },
         
         'Bhargavi': {
            role: 'Documentation Head',
            imgSrc: pfp_document,
            quote: 'Be the way you are',
            instagram: 'https://www.instagram.com/bhargavi_amidhepuram',
            linkedin: 'https://www.linkedin.com/in/bhargavi-harshini-amidhepuram',
            icon: <PiHandshakeBold />,
        },

        'Gone Eeshitha': {
            role: 'Publicity Head',
            imgSrc: pfp_publicity,
            quote: '“Adapt and thrive.”',
            instagram: 'https://www.instagram.com/eesha45?igsh=MWYyMXIxcDc3YW1vdQ%3D%3D&utm_source=qr',
            github: 'https://github.com/eesha264',
            linkedin: 'https://www.linkedin.com/in/gone-eeshitha-38192624a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
            twitter: '',
            icon: <PiHandshakeBold />,
        },
    },
    minor: {
        'Web Master': {
            label: 'Prem Sai K',
            color_complex: 'from-[#ff6f61] shadow-[#ff6f61]', // Soft red-orange
            icon: <AiOutlineGlobal />,
            imgSrc: pfp_webmaster,
            quote: 'wake up to reality.',
            linktree: '',
            instagram: 'https://www.instagram.com/iblameprems/',
            discord: 'https://discordapp.com/users/691359092136083457',
            github: 'https://github.com/prem22k',
            linkedin: 'https://www.linkedin.com/in/premsai22k/',
            website: '',
        },
    },
}

export default leadership