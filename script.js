(() => {
  const C = window.SITE_CONTENT;
  let lang = localStorage.getItem('showdown-language') === 'en' ? 'en' : 'zh';
  let activeTab = 'schedule';
  let lastStoryTrigger = null;
  let lastStaffTrigger = null;
  let lastGalleryTrigger = null;
  const pick = (obj) => obj[lang === 'zh' ? 'zh' : 'en'];
  const el = (id) => document.getElementById(id);
  const historyCopyZh = document.querySelector('.history-copy').innerHTML;
  const sponsorProjectsZh = document.querySelector('.sponsor-projects').innerHTML;
  const sponsorRightsZh = document.querySelector('.sponsor-rights-list').innerHTML;

  function localizeStaticContent() {
    const isZh = lang === 'zh';
    el('story-history-open').textContent = isZh ? '点击查看中国盲人板铃球发展历史' : 'View the History of Showdown in China';
    el('sponsor-rights-open').textContent = isZh ? '点击查看赞助商权益' : 'View Sponsor Benefits';
    document.querySelector('.sponsor-projects').innerHTML = isZh ? sponsorProjectsZh : '<span>Team China Apparel Sponsorship</span><span>Athlete Equipment Sponsorship</span><span>Bags and Accessories Sponsorship</span><span>Financial Sponsorship</span>';
    document.querySelector('.sponsor-contact').innerHTML = isZh ? '联系帕乐盲人体育俱乐部秘书处<br><b>jennyhuang.sport@aliyun.com</b>' : 'Contact Hangzhou Para Blind Sports Club Secretariat<br><b>jennyhuang.sport@aliyun.com</b>';
    const historyModal = el('history-modal');
    historyModal.querySelector('.eyebrow span:last-child').textContent = isZh ? '项目介绍' : 'Project Introduction';
    el('history-modal-title').textContent = isZh ? '中国盲人板铃球项目介绍' : 'Showdown in China';
    historyModal.querySelector('.history-copy').innerHTML = isZh ? historyCopyZh : '<p>Showdown is an indoor competitive ball sport designed for people with visual impairments. Athletes locate the audible ball by the sound from its internal bell, judging position, direction and speed through striking, interception, defense and attack. Developed from the international blind-sport system, the sport combines education, competition, fitness, rehabilitation and recreation.</p><h3>Origins</h3><p>The structured development of Showdown in China began at Dalian School for the Blind and Deaf. In 2016, a Chinese delegation led by Tu Xiaokun travelled to Pisa, Italy to observe the European Showdown Championships and study coaching, competition rules and event organization. The school subsequently built a dedicated activity room, purchased equipment and established teaching and training programs. By the end of 2016, it was approved as Asia’s first IBSA Showdown Development Center.</p><h3>Development</h3><p>From 2017 onward, Showdown entered China’s rehabilitation and fitness-sport promotion system. National seminars and training courses established a foundation for coaches, referees and grassroots promotion. In 2018, the sport began entering provincial disability-sport events and expanded through training, demonstrations and invitational competitions.</p><p>In 2019, the first National Showdown Exchange Tournament was held in Dalian, bringing together participants from 21 provincial-level regions. From 2020, local development accelerated in Jiangsu, Guangdong, Zhejiang and Shanghai, connecting special education, disabled persons’ federations, associations of the blind and community sport.</p><p>Provincial Para Games marked a major step forward from 2022. During 2023 and 2024, training camps, local championships and exchange events increased across the Yangtze River Delta. In 2025, the national exchange tournament in Yixing drew 26 teams and 78 visually impaired athletes from 16 provincial-level regions.</p><p>China’s first international Showdown delegation competed in Korea in late 2025, creating practical experience for international rules, athlete development and further exchange. In 2026, Showdown entered the official program of the 12th Zhejiang Provincial Para Games and remained part of the Jiangsu Provincial Para Games program, reflecting its continuing integration into provincial disability-sport competition.</p><p>By June 2026, Showdown in China had developed a clear pathway of teaching and training, rules education, national exchange, provincial events, community inclusion and international engagement.</p>';
    const rightsModal = el('sponsor-rights-modal');
    rightsModal.querySelector('.eyebrow span:last-child').textContent = isZh ? '赞助商权益展示（包含但不限于）' : 'Sponsor Benefits (Including but Not Limited To)';
    el('sponsor-rights-title').textContent = isZh ? '赞助商权益' : 'Sponsor Benefits';
    rightsModal.querySelector('.sponsor-rights-list').innerHTML = isZh ? sponsorRightsZh : '<li>Brand acknowledgement at the departure ceremony</li><li>Logo placement on training wear, warm-up wear, outerwear, luggage and equipment bags</li><li>Visibility on pre- and post-match interview apparel</li><li>Visibility on travel wear and delegation apparel</li><li>On-site advertising at overseas competitions</li><li>Training diaries, match-day vlogs and behind-the-scenes documentaries</li><li>Team greeting videos and brand mentions</li><li>Overseas city check-in content</li><li>Brand placement on results, schedule and award graphics</li><li>Joint news releases</li><li>Visibility in press conferences, interview areas and media kits</li><li>Official social-media acknowledgement</li>';
    rightsModal.querySelector('.sponsor-rights-note').innerHTML = isZh ? '联系 <a href="mailto:jennyhuang.sport@aliyun.com">jennyhuang.sport@aliyun.com</a> 获取赞助商合作方案 PDF' : 'Contact <a href="mailto:jennyhuang.sport@aliyun.com">jennyhuang.sport@aliyun.com</a> to request the sponsor cooperation PDF.';
  }

  function renderDynamic() {
    el('mission-grid').innerHTML = C.mission.map(x => `<article class="mission-card"><div class="mission-card-top"><span class="num">${x.n}</span><span class="mission-icon ${x.icon}" aria-hidden="true"><i></i></span></div><h3>${pick(x)}</h3><p class="mission-card-lead">${lang==='zh'?x.lzh:x.len}</p><p class="mission-card-copy">${lang==='zh'?x.dzh:x.den}</p></article>`).join('');
    el('road-timeline').innerHTML = C.road.map(x => `<article class="timeline-item"><span class="phase">PHASE ${x.phase}</span><div><h3>${pick(x)}</h3><p>${lang==='zh'?x.dzh:x.den}</p></div></article>`).join('');
    el('athlete-grid').innerHTML = C.athletes.map((x,i) => { const name=lang==='zh'?x.nameZh:x.nameEn; return `<article class="athlete-card"><div class="athlete-photo${x.image?'':' image-placeholder'}"${x.image?'':` role="img" aria-label="${lang==='zh'?'运动员照片待公布':'Athlete photo coming soon'}"`}>${x.image?`<img src="${x.image}" alt="${name}${lang==='zh'?'在盲人板铃球比赛中':' competing in Showdown'}" loading="lazy">`:'<span class="placeholder-person" aria-hidden="true"></span>'}<span class="number">${x.number}</span></div><div class="athlete-body"><span class="event-name">${lang==='zh'?x.eventZh:x.eventEn}</span><h3>${name}</h3><p class="athlete-birth"><time datetime="${x.birthDate}">${lang==='zh'?`${x.birthDate.slice(0,4)}年生`:`Born ${x.birthDate.slice(0,4)}`}</time></p><p class="athlete-ranking">${lang==='zh'?x.rankingZh:x.rankingEn}</p><p>${lang==='zh'?x.bioZh:x.bioEn}</p><p class="athlete-achievement">${lang==='zh'?x.achievementZh:x.achievementEn}</p><button class="story-button" data-athlete="${i}">${lang==='zh'?'个人故事 →':'Personal Story →'}</button></div></article>`; }).join('');
    el('staff-track').innerHTML = C.staff.map((x,i) => { const name=lang==='zh'?x.name:x.nameEn; return `<article class="staff-card${i<2?' staff-card-primary':''}" data-staff-index="${i}" role="listitem"><div class="staff-photo"><img src="${x.image}" alt="${name}${lang==='zh'?'工作人员照片':' team staff'}" loading="lazy"><span class="staff-number">${String(i+1).padStart(2,'0')}</span></div><div class="staff-card-body"><span class="staff-role">${lang==='zh'?x.roleZh:x.roleEn}</span><h4>${name}</h4><button class="staff-profile-button" data-staff="${i}">${lang==='zh'?'个人介绍':'View Profile'} →</button></div></article>`; }).join('');
    renderEvent();
    el('stats-grid').innerHTML = C.stats.map(x => `<div class="stat"><strong>${x.value}</strong><span>${pick(x)}</span></div>`).join('');
    el('contact-list').innerHTML = C.contacts.map(x => { const value=lang==='zh'?x.value:(x.valueEn||x.value); return `<div class="contact-row${x.image?' contact-qr-row':''}"><span>${lang==='zh'?x.labelZh:x.labelEn}</span>${x.image?`<img class="contact-qr" src="${x.image}" alt="${lang==='zh'?x.altZh:x.altEn}" loading="lazy">`:x.href?`<a href="${x.href}"><strong>${value}</strong></a>`:`<strong>${value}</strong>`}</div>`; }).join('');
    bindStoryButtons();
    bindStaffButtons();
  }

  function gallerySlot(image,event,index,modalView=false){
    if(image){
      const alt=lang==='zh'?image.altZh:image.altEn;
      const photo=`<figure class="gallery-photo"><img src="${image.src}" alt="${alt}" loading="lazy"><figcaption>${String(index+1).padStart(2,'0')}</figcaption></figure>`;
      return modalView?`<a class="gallery-photo-link" href="${image.src}" target="_blank" rel="noopener" aria-label="${alt}">${photo}</a>`:photo;
    }
    return `<div class="gallery-placeholder" role="img" aria-label="${lang==='zh'?event.titleZh:event.titleEn} · ${C.translations[lang].galleryPlaceholder}"><span>${String(index+1).padStart(2,'0')}</span><strong>${C.translations[lang].galleryPlaceholder}</strong></div>`;
  }

  function renderGalleryModal(){
    el('gallery-modal-content').innerHTML=C.gallery.map(event=>`<section class="gallery-modal-section"><h3>${lang==='zh'?event.titleZh:event.titleEn}</h3><div class="gallery-preview-grid">${event.images.map((image,index)=>gallerySlot(image,event,index,true)).join('')}</div></section>`).join('');
  }

  function renderEvent(){
    const x=C.events[activeTab];
    const items = x.items ? `<div class="event-schedule">${x.items.map(item => `<div class="event-schedule-row"><strong>${lang==='zh'?item.dateZh:item.dateEn}</strong><span>${lang==='zh'?item.textZh:item.textEn}</span></div>`).join('')}</div>` : '';
    const venue = activeTab==='schedule' ? (x.venueImage ? `<img class="event-venue-image" src="${x.venueImage}" alt="${lang==='zh'?x.venueAltZh:x.venueAltEn}">` : `<div class="event-venue-placeholder" role="img" aria-label="${C.translations[lang].venueImagePending}"><span>${C.translations[lang].venueImagePending}</span></div>`) : '';
    const badge = lang==='zh' ? (x.badgeZh || '待官方公布') : (x.badgeEn || 'OFFICIAL INFORMATION COMING SOON');
    el('event-panel').innerHTML=`<span class="panel-type">${pick(x)}</span><h3>${lang==='zh'?x.statusZh:x.statusEn}</h3><p>${lang==='zh'?x.metaZh:x.metaEn}</p>${venue}${items}<span class="tba">${badge}</span>`;
  }

  function applyLanguage(next) {
    lang = next;
    localStorage.setItem('showdown-language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '中国队-2026IBSA亚洲盲人板铃球锦标赛' : 'TEAM CHINA SHOWDOWN | 2026 Asian Championships';
    document.querySelectorAll('[data-i18n]').forEach(node => { const v=C.translations[lang][node.dataset.i18n]; if(v) node.textContent=v; });
    document.querySelectorAll('[data-i18n-html]').forEach(node => { const v=C.translations[lang][node.dataset.i18nHtml]; if(v) node.innerHTML=v; });
    document.querySelectorAll('[data-alt-zh]').forEach(node => node.setAttribute('aria-label',lang==='zh'?node.dataset.altZh:node.dataset.altEn));
    const toggle=document.querySelector('.lang-toggle');
    toggle.innerHTML=lang==='zh'?'<span class="active">中</span><span>EN</span>':'<span>中</span><span class="active">EN</span>';
    toggle.setAttribute('aria-label',lang==='zh'?'Switch to English':'切换至中文');
    document.querySelector('.menu-toggle').setAttribute('aria-label',lang==='zh'?'打开菜单':'Open menu');
    localizeStaticContent();
    renderDynamic();
    if(!galleryModal.hidden)renderGalleryModal();
  }

  function bindStoryButtons(){ document.querySelectorAll('.story-button').forEach(btn=>btn.addEventListener('click',()=>{ const athlete=C.athletes[Number(btn.dataset.athlete)]; const modal=el('athlete-modal'); const name=lang==='zh'?athlete.nameZh:athlete.nameEn; lastStoryTrigger=btn; el('modal-photo').src=athlete.image; el('modal-photo').alt=`${name}${lang==='zh'?'在盲人板铃球比赛中':' competing in Showdown'}`; el('modal-title').textContent=name; modal.querySelector('[data-i18n="modalCopy"]').textContent=lang==='zh'?`${athlete.birthDate.slice(0,4)}年生。${athlete.rankingZh}。${athlete.bioZh} ${athlete.achievementZh}`:`Born ${athlete.birthDate.slice(0,4)}. ${athlete.rankingEn}. ${athlete.bioEn} ${athlete.achievementEn}`; modal.hidden=false; document.body.style.overflow='hidden'; modal.querySelector('.modal-close').focus(); })); }
  function bindStaffButtons(){ document.querySelectorAll('.staff-profile-button').forEach(btn=>btn.addEventListener('click',()=>{ const index=Number(btn.dataset.staff); const member=C.staff[index]; const staffModal=el('staff-modal'); const name=lang==='zh'?member.name:member.nameEn; lastStaffTrigger=btn; staffModal.dataset.staffIndex=String(index); el('staff-modal-photo').src=member.image; el('staff-modal-photo').alt=`${name}${lang==='zh'?'工作人员照片':' team staff'}`; el('staff-modal-title').textContent=name; el('staff-modal-role').textContent=lang==='zh'?member.roleZh:member.roleEn; el('staff-modal-copy').textContent=lang==='zh'?member.bioZh:member.bioEn; staffModal.hidden=false; document.body.style.overflow='hidden'; staffModal.querySelector('.staff-modal-close').focus(); })); }
  const menuBtn=document.querySelector('.menu-toggle'), menu=el('mobile-menu');
  function closeMenu(){ menuBtn.setAttribute('aria-expanded','false'); menu.hidden=true; document.body.classList.remove('menu-open'); }
  menuBtn.addEventListener('click',()=>{ const open=menuBtn.getAttribute('aria-expanded')==='true'; menuBtn.setAttribute('aria-expanded',String(!open)); menu.hidden=open; document.body.classList.toggle('menu-open',!open); });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.querySelector('.lang-toggle').addEventListener('click',()=>applyLanguage(lang==='zh'?'en':'zh'));
  document.querySelectorAll('[role="tab"]').forEach((tab,index)=>{ tab.addEventListener('click',()=>{activeTab=tab.dataset.tab;document.querySelectorAll('[role="tab"]').forEach(x=>x.setAttribute('aria-selected',String(x===tab)));renderEvent();}); tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;const tabs=[...document.querySelectorAll('[role="tab"]')];const next=(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click();});});
  const modal=el('athlete-modal');
  function closeModal(){if(modal.hidden)return;modal.hidden=true;document.body.style.overflow='';if(lastStoryTrigger)lastStoryTrigger.focus();}
  modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  const staffModal=el('staff-modal');
  function closeStaffModal(){if(staffModal.hidden)return;staffModal.hidden=true;document.body.style.overflow='';if(lastStaffTrigger)lastStaffTrigger.focus();}
  staffModal.querySelector('.staff-modal-close').addEventListener('click',closeStaffModal);staffModal.addEventListener('click',e=>{if(e.target===staffModal)closeStaffModal();});
  const galleryModal=el('gallery-modal');
  function openGalleryModal(event){lastGalleryTrigger=event.currentTarget;renderGalleryModal();galleryModal.hidden=false;document.body.style.overflow='hidden';galleryModal.querySelector('.gallery-modal-close').focus();}
  function closeGalleryModal(){if(galleryModal.hidden)return;galleryModal.hidden=true;document.body.style.overflow='';if(lastGalleryTrigger)lastGalleryTrigger.focus();}
  el('gallery-more').addEventListener('click',openGalleryModal);
  el('road-gallery-more').addEventListener('click',openGalleryModal);
  galleryModal.querySelector('.gallery-modal-close').addEventListener('click',closeGalleryModal);galleryModal.addEventListener('click',e=>{if(e.target===galleryModal)closeGalleryModal();});
  const historyModal=el('history-modal');
  let lastHistoryTrigger=null;
  function openHistoryModal(event){lastHistoryTrigger=event.currentTarget;historyModal.hidden=false;document.body.style.overflow='hidden';historyModal.querySelector('.history-modal-close').focus();}
  function closeHistoryModal(){if(historyModal.hidden)return;historyModal.hidden=true;document.body.style.overflow='';if(lastHistoryTrigger)lastHistoryTrigger.focus();}
  el('story-history-open').addEventListener('click',openHistoryModal);
  historyModal.querySelector('.history-modal-close').addEventListener('click',closeHistoryModal);historyModal.addEventListener('click',e=>{if(e.target===historyModal)closeHistoryModal();});
  const sponsorRightsModal=el('sponsor-rights-modal');
  let lastSponsorRightsTrigger=null;
  function openSponsorRightsModal(event){lastSponsorRightsTrigger=event.currentTarget;sponsorRightsModal.hidden=false;document.body.style.overflow='hidden';sponsorRightsModal.querySelector('.sponsor-rights-close').focus();}
  function closeSponsorRightsModal(){if(sponsorRightsModal.hidden)return;sponsorRightsModal.hidden=true;document.body.style.overflow='';if(lastSponsorRightsTrigger)lastSponsorRightsTrigger.focus();}
  el('sponsor-rights-open').addEventListener('click',openSponsorRightsModal);
  sponsorRightsModal.querySelector('.sponsor-rights-close').addEventListener('click',closeSponsorRightsModal);sponsorRightsModal.addEventListener('click',e=>{if(e.target===sponsorRightsModal)closeSponsorRightsModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeStaffModal();closeGalleryModal();closeHistoryModal();closeSponsorRightsModal();closeMenu();}});
  applyLanguage(lang);
})();
