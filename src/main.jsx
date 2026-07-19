import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronDown, Clock3, Heart, MapPin, Music, Pause, Play, Send, X } from 'lucide-react'
import './styles.css'

const eventDate = new Date('2026-08-16T11:00:00+05:30').getTime()
const photos = [
  ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85','A quiet moment together'],
  ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85','Golden bridal details'],
  ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85','A celebration table'],
  ['https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=85','Together, always'],
  ['https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85','A bouquet in bloom'],
  ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85','Love in every glance']
]
const timeline = [
  ['11:00 AM', 'Guests Arrive', 'A warm welcome and refreshments'],
  ['12:00 PM', 'Lunch', 'Enjoy a delicious wedding feast with family and friends'],
  ['4:00 PM', "Groom Goes to Bride's House", 'The groom leaves to accompany the bride'],
  ['5:00 PM', "Bride Arrives at Groom's House", 'A joyful welcome to the bride'],
  ['6:00 PM', 'Farewell', 'With prayers and love, we conclude our celebration']
]

function Countdown(){ const [left,setLeft]=useState(eventDate-Date.now()); useEffect(()=>{const i=setInterval(()=>setLeft(eventDate-Date.now()),1000);return()=>clearInterval(i)},[]); const n=Math.max(0,left); const t=[['Days',Math.floor(n/86400000)],['Hours',Math.floor(n/3600000)%24],['Minutes',Math.floor(n/60000)%60],['Seconds',Math.floor(n/1000)%60]];return <div className="countdown">{t.map(([l,v])=><div key={l}><b>{String(v).padStart(2,'0')}</b><span>{l}</span></div>)}</div> }
function Section({id,eyebrow,title,children}){return <section id={id} className="section"><motion.div initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.7}} className="section-inner"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><div className="ornament">✦</div>{children}</motion.div></section>}
function App(){
 const [loading,setLoading]=useState(true), [progress,setProgress]=useState(0), [lightbox,setLightbox]=useState(null), [submitted,setSubmitted]=useState(false), [playing,setPlaying]=useState(false); const audio=useRef(null)
 useEffect(()=>{const t=setTimeout(()=>setLoading(false),1300);const s=()=>setProgress((scrollY/(document.body.scrollHeight-innerHeight))*100);addEventListener('scroll',s);s();return()=>{clearTimeout(t);removeEventListener('scroll',s)}},[])
 const music=()=>{if(!audio.current)return; playing?audio.current.pause():audio.current.play();setPlaying(!playing)}
 return <><AnimatePresence>{loading&&<motion.div className="loader" exit={{opacity:0}} transition={{duration:.6}}><div className="monogram">N <i>+</i> N</div><span>Preparing a beautiful moment</span></motion.div>}</AnimatePresence><div className="progress" style={{width:`${progress||0}%`}}/><div className="particles">{Array.from({length:18},(_,i)=><i key={i} style={{left:`${(i*17)%100}%`,animationDelay:`${i*.7}s`,animationDuration:`${9+i%6}s`}}/>)}</div>
 <audio ref={audio} loop src="https://cdn.pixabay.com/download/audio/2022/02/22/audio_e0c2b1c5b6.mp3?filename=romantic-piano-112199.mp3"/>
 <button className="music" onClick={music} aria-label="Toggle background music">{playing?<Pause size={16}/>:<Music size={16}/>}<span>{playing?'Pause music':'Our song'}</span></button>
 <main><section className="hero"><nav><a href="#home" className="nav-brand">N <em>+</em> N</a><div className="nav-links"><a href="#story">Our Story</a><a href="#details">Details</a><a href="#rsvp">RSVP</a></div></nav><motion.div className="hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.35,duration:.8}}><p className="eyebrow">Together with our families</p><h1>Nabeel <span>&</span> Nidha</h1><p className="hero-copy">request the pleasure of your company<br/>as they begin their forever.</p><div className="hero-date"><CalendarDays size={17}/> Sunday, 16 August 2026 <i/> 11:00 AM – 6:00 PM</div><a href="#invitation" className="button">Open Invitation <ChevronDown size={17}/></a></motion.div><div className="hero-credit">A celebration of love · 2027</div></section>
 <Section id="invitation" eyebrow="The Invitation" title="Wedding Reception"><p className="lead">With hearts full of gratitude, we invite you to share in the joy of our wedding celebration.</p><div className="invite-card glass"><Heart className="heart" fill="currentColor"/><p>In the name of Allah, the Most Gracious, the Most Merciful</p><h3>Nabeel & Nidha</h3><p className="details-line">Sunday, the Sixteenth of August<br/>Two Thousand Twenty-Six · 11:00 AM – 6:00 PM</p><p className="details-line">VP House<br/><i>Mattool South, Kannur</i></p></div></Section>
 <Section id="story" eyebrow="Our Story" title="It started with a smile"><div className="story-grid"><div className="story-image"><img src={photos[0][0]} alt="Nabeel and Nidha together"/></div><div className="story-text"><p>Some stories are carefully planned; ours unfolded in the most unexpected, beautiful way. From the first conversation, we found in each other a sense of home.</p><p>What began as friendship turned into a promise — to choose laughter, kindness, and each other, every single day.</p><p className="signature">Nabeel & Nidha</p></div></div></Section>
 <Section id="details" eyebrow="The Celebration" title="Save our special date"><Countdown/><div className="timeline">{timeline.map(([time,name,desc],i)=><div className="event" key={name}><span>{time}</span><b>{name}</b><p>{desc}</p>{i<3&&<i/>}</div>)}</div></Section>
 <Section id="venue" eyebrow="The Venue" title="Where our forever begins"><div className="venue-card glass"><div><MapPin size={25}/><h3>VP House</h3><p>Mattool South<br/>Kannur, 670302</p><a className="text-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Matool,+Kerala+670302,+India/@32.7040107,22.0917581,5205615m/data=!3m1!1e3!4m10!1m3!11m2!2s_JIEFHhslCr0Naj36qpP0uUPVe8_RA!3e1!3m5!1s0x3ba4143228e42271:0xe4067110a53d77b!8m2!3d11.966825!4d75.2889789!16s%2Fg%2F11t7r2dx65?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D">Get directions ↗</a></div><div className="map"><iframe title="Fairmont Jaipur map" src="https://www.google.com/maps?q=Fairmont%20Jaipur&output=embed" loading="lazy"/></div></div></Section>
 <Section id="gallery" eyebrow="Little Moments" title="A glimpse of us"><div className="gallery">{photos.map(([src,alt],i)=><button key={src} className={`photo p${i}`} onClick={()=>setLightbox([src,alt])}><img src={src} alt={alt}/><span>View</span></button>)}</div></Section>
 <Section id="rsvp" eyebrow="Will You Join Us?" title="Your presence is our present"><p className="lead">Kindly reply by 20 January 2027. We cannot wait to celebrate with you.</p>{submitted?<div className="thank-you glass"><Heart fill="currentColor"/><h3>Thank you for your response</h3><p>We’re so happy you’ll be part of our day.</p></div>:<form className="rsvp glass" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>Full name<input required placeholder="Your name"/></label><label>Will you attend?<select required defaultValue=""><option value="" disabled>Select your response</option><option>Joyfully accepts</option><option>Regretfully declines</option></select></label><label>Number of guests<select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>Message <textarea placeholder="Leave a note for the couple" rows="3"/></label><button className="button" type="submit">Send RSVP <Send size={16}/></button></form>}</Section>
 </main><footer><div className="monogram">N <i>+</i> N</div><p>Made with love for our favorite people</p><small>© 2026 Nabeel & Nidha</small></footer>
 <AnimatePresence>{lightbox&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLightbox(null)}><button aria-label="Close image"><X/></button><motion.img initial={{scale:.94}} animate={{scale:1}} src={lightbox[0]} alt={lightbox[1]}/></motion.div>}</AnimatePresence></>
}
createRoot(document.getElementById('root')).render(<App />)
