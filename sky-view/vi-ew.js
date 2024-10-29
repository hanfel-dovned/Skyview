customElements.define(
  'vi-ew',
  class extends HTMLElement {
    static get observedAttributes() {
      //
      return ['our', 'open', 'windows-open', 'default-strategies']
    }
    constructor() {
      //
      super()
      const shadow = this.attachShadow({ mode: 'open' })
      this.loadCSSs(['style.css', 'feather.css']).then((sheets) => {
        shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, ...sheets]
      })
      shadow.innerHTML = `
      <div id="tray" class="fc js af p2 br1"           
      style="background: white; gap: 28px;">
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 hover fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('sky-open', {bubbles:true, composed: true}))"
          >
          <span id="sig-menu">~</span>
        </button>
        <div class="fc" style="gap: 19px;">
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('sky-open', {bubbles:true, composed: true}))">
          <img class="icon-light" src="icons/sigil.svg" alt="sigil" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-forum'))">
          <img class="icon-light" src="icons/Forum.svg" alt="landscape" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-wallet'))">
          <img class="icon-light" src="icons/UrWallet.svg" alt="landscape" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-landscape'))">
          <img class="icon-light" src="icons/Landscape.svg" alt="landscape" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-watch'))">
          <img class="icon-light" src="icons/Clock.svg" alt="landscape" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-messenger'))">
          <img class="icon-light" src="icons/text-bubble.svg" alt="messenger" height="18"/>
        </button>
        <button
          id="sky-open"
          style="background: white"
          class="br1 p2 b0 fc js ac ass"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-files'))">
          <img class="icon-light" src="icons/folder.svg" alt="files" height="18"/>
        </button>
      </div>
      </div>
      <nav id="nav" class="fc br1" style="background: white;">
        <div id="tab-controller" class=" br3 fc g3 grow p2">
          <button
            id="sky-open"
            class="hover fc jc as hideable"
            onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('sky-open', {bubbles:true, composed: true}))"
            style="line-height: 1; height:47px;"
            >
            <span id="sig-menu">~</span>
          </button>
          <div style="border-bottom: solid 1px #CFCFCF;"></div>
          <div class="p2">
            <img class="p2 br1" style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); background: #C3CDC3" src="./icons/UrbitCard.svg"/>
          </div>
          <div style="border-bottom: solid 1px #CFCFCF;"></div>
          <div class="fc g3 grow scroll-y">
            <div id="tabs" class="fc g2 p2"></div>
            <div id="bb" style="border-bottom: solid 1px #CFCFCF;"></div>
            <div class="grow"></div>
          </div>
          <footer class="fc g2 p2" style="padding-bottom:0;">
            <div class="fr g2">
              <button
              onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('log-out'))"
              class="hover br1 bd0 p2 grow fr g2 ac"
              >
                <img src="./icons/LogOut.svg"/>
                <span class="wf tl">Log out</span>
              </button>
            </div>
          </footer>
        </div>
      </nav>
      <main>
        <slot name="s-none" id="s-none">
          <div class="wf hf br1 fc ac jc f4">no windows open</div>
        </slot>
        <slot name="s-login" id="s-login">
          <div class="wf hf br1 fc ac jc g2">
            <span id="pattern-err" class="hidden f3">Please match requested format.</span>
            <div class="p2 fc g2" style="width:260px;">
              <span style="font-size: 40pt;" class="tc">Urbit</span>
              <form id="login-form" class="fc g2"> 
                <input 
                id="ship-input" 
                class="br3 bd4 p2 in-st"
                type="text"
                placeholder="~sampel-palnet" 
                pattern="^~((([a-z]{6}){1,2}-{0,2})+|[a-z]{3})$" 
                autocomplete="off"
                required
                />
                <div
                class="br3 bd4 p2 fr g1 ac jb in-st">
                  <input 
                  id="code-input" 
                  style="border: none;"
                  class="wf in-st"
                  type="password"
                  placeholder="~sampel-ticlyt-migfun-falmel"
                  pattern="^~(([a-z]{6}-){3}[a-z]{6})$" 
                  required
                  />
                  <button 
                  type="button" 
                  style="border: none;"
                  onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('toggle-password'))">
                    <span id="eye-icon" 
                    class="mso f2 hover">visibility</span>
                  </button>
                </div>
                <button 
                type="button" 
                onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('log-in'))" 
                class="br3 p2 b4 hover btn-st fr ac jc">
                  <span>Log in</span>
                </button>
              </form>
              <div class="fr jc g1">
                <span class="f2">
                Don’t have an Urbit ID? 
                </span>
                <span onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('bridge-redirect'))" class="sign-up hover"> Sign Up</span>
              </div>
            </div>
          </div>
        </slot>
        <slot name="s0" id="s0"></slot>
        <slot name="s1" id="s1"></slot>
        <slot name="s2" id="s2"></slot>
        <slot name="s3" id="s3"></slot>
        <slot name="s4" id="s4"></slot>
      </main>
      <slot id="default" style="display: none;"></slot>
    `
      const script = document.createElement('script')
      script.textContent = `
      window.addEventListener('message', (event) => {
        if (event.origin === window.location.origin){
          if(event.data.messagetype === 'new-wind'){
            const customEvent = new CustomEvent('new-window', {detail: {href: event.data.href, slot: 's-2'}});
            const element = document.querySelector('vi-ew');
            if (element) {
              element.dispatchEvent(customEvent);
            }
          }
        }else{
        return;
        }
      })`
      shadow.appendChild(script)
    }
    async loadCSSs(urls) {
      const sheets = await Promise.all(urls.map((url) => this.loadCSS(url)))
      return sheets
    }
    async loadCSS(url) {
      const response = await fetch(url)
      const cssText = await response.text()
      const sheet = new CSSStyleSheet()
      await sheet.replace(cssText)
      return sheet
    }
    get windowsOpen() {
      return parseInt(this.getAttribute('windows-open') || '0')
    }
    get our() {
      return this.getAttribute('our')
    }
    get currentFeatherRules() {
      return this.qs('feather-settings')?.currentFeatherRules || []
    }
    get windows() {
      let slots = $(this)
        .children('wi-nd[slot]')
        .get()
        .toSorted((a, b) => {
          let aSlot = parseFloat(a.getAttribute('slot').slice(1))
          let bSlot = parseFloat(b.getAttribute('slot').slice(1))
          if (aSlot > bSlot) return 1
          if (aSlot < bSlot) return -1
          return 0
        })
      let noslots = $(this).children('wi-nd:not([slot])').get()
      return [...slots, ...noslots]
    }
    qs(sel) {
      return this.shadowRoot.querySelector(sel)
    }
    qsa(sel) {
      return this.shadowRoot.querySelectorAll(sel)
    }
    gid(id) {
      return this.shadowRoot.getElementById(id)
    }
    connectedCallback() {
      $(this).off()
      $(this).on('sky-open', (e) => {
        this.toggleAttribute('open')
        this.saveLayout()
      })
      $(this).on('fix-slots', () => {
        this.fixSlots()
      })
      $(this).on('close-window', (e) => {
        let wind = $(e.target)
        if (wind.attr('slot') != undefined) {
          this.shrinkFlock()
        }
        wind.remove()
        this.fixSlots()
        if (!!localStorage.getItem('show-bridge')) {
          localStorage.removeItem('show-bridge')
          localStorage.removeItem('sky-layout')
          this.restoreLayout()
        } else {
          this.renderTabs()
        }
      })
      $(this).on('minimize-window', (e) => {
        let wind = $(e.target)
        let slotAttr = wind.attr('slot')
        if (slotAttr != undefined) {
          let slot = this.qs(`[name="${slotAttr}"]`)
          slot.classList.add('min')
          setTimeout(() => {
            wind.removeAttr('slot')
            this.shrinkFlock()
            slot.classList.remove('min')
            this.fixSlots()
            this.renderTabs()
          }, 300)
        } else {
          this.fixSlots()
          this.renderTabs()
        }
      })
      $(this).on('maximize-window', (e) => {
        let wind = $(e.target)
        if (!wind.attr('slot')) {
          this.growFlock()
        }
        wind.attr('slot', 's-1')
        this.fixSlots()
        this.renderTabs()
      })
      $(this).on('zoom-window', (e) => {
        let wind = $(e.target)
        let windSlot = wind.attr('slot')
        let slot = this.gid(windSlot)
        slot.classList.toggle('zoom')
      })
      $(this).on('drag-start', (e) => {
        $(this.windows).attr('dragging', '')
      })
      $(this).on('drag-end', (e) => {
        $(this.windows).removeAttr('dragging')
      })
      $(this).on('here-moved', () => {
        this.renderTabs()
      })
      $(this.gid('s-none')).off()
      $(this.gid('s-none')).on('slotchange', (e) => {
        let authenticated = localStorage.getItem('auth')
        if (authenticated) {
          this.renderTabs()
        }
      })
      $(this.gid('s0')).off()
      $(this.gid('s0')).on('slotchange', (e) => {
        let authenticated = localStorage.getItem('auth')
        if (authenticated) {
          this.renderTabs()
        }
      })
      $(this.gid('s1')).off()
      $(this.gid('s1')).on('slotchange', () => {
        let authenticated = localStorage.getItem('auth')
        if (authenticated) {
          this.renderTabs()
        }
      })
      $(this.gid('s2')).off()
      $(this.gid('s2')).on('slotchange', () => {
        this.renderTabs()
      })
      $(this.gid('s3')).off()
      $(this.gid('s3')).on('slotchange', () => {
        this.renderTabs()
      })
      $(this.gid('default')).off()
      $(this.gid('default')).on('slotchange', () => {
        this.renderTabs()
      })

      $(this.gid('nav')).off()
      $(this.gid('nav')).on('dragover', (e) => {
        e.preventDefault()
      })
      $(this.gid('nav')).on('drop', (e) => {
        e.preventDefault()
        let wid = e.originalEvent.dataTransfer.getData('text/plain')
        let wind = $(`[wid='${wid}']`)
      })
      $(this).on('toggle-password', (e) => {
        let input = this.gid('code-input')
        let eyeIcon = this.gid('eye-icon')
        if (input.getAttribute('type') === 'password') {
          $(input).attr('type', 'text')
          eyeIcon.innerHTML = 'visibility_off'
        } else {
          $(input).attr('type', 'password')
          eyeIcon.innerHTML = 'visibility'
        }
      })
      $(this).on('log-in', (e) => {
        //  sending post request here to login
        e.preventDefault()
        let input = $(this.gid('ship-input'))[0]
        if (!input.checkValidity()) {
          $(this.gid('pattern-err')).removeClass('hidden')
        } else {
          $(this.gid('pattern-err')).addClass('hidden')
          this.getUrl()
        }
      })
      $(this).on('log-out', () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('local-url')
        this.toggleAttribute('open')
        this.restoreLayout()
      })
      $(this).on('bridge-redirect', () => {
        localStorage.setItem('show-bridge', true)
        let layout = {
          open: false,
          windowsOpen: 1,
          windows: [
            {
              here: `https://bridge.urbit.org/`,
              slot: 's0'
            }
          ]
        }
        localStorage.setItem('sky-layout', JSON.stringify(layout))
        this.restoreLayout()
      })
      $(this).on('open-landscape', (e) => {
        let shipUrl = localStorage.getItem('local-url')
        this.openWindow(
          e,
          `https://tolmud-tobtud.startram.io/~/login?/apps/landscape`
        )
      })
      $(this).on('open-forum', (e) => {
        this.openWindow(e, `${window.location.origin}/forum`)
      })
      $(this).on('open-wallet', (e) => {
        this.openWindow(e, `${window.location.origin}/wallet`)
      })
      $(this).on('open-watch', (e) => {
        this.openWindow(e, `${window.location.origin}/watch`)
      })
      $(this).on('open-messenger', (e) => {
        this.openWindow(e, `${window.location.origin}/messenger`)
      })
      $(this).on('open-files', (e) => {
        this.openWindow(e, `${window.location.origin}/file-app`)
      })
      this.qs('main').className = !this.windowsOpen
        ? 'open-0'
        : `open-${this.windowsOpen}`
      this.restoreLayout()
      this.zoomListener()
    }
    attributeChangedCallback(name, oldValue, newValue) {
      //
      if (name === 'open') {
        $(this.gid('tab-controller')).addClass('hidden')
        if (newValue === null) {
          $(this).removeClass('open')
        } else {
          $(this).addClass('open')
          $(this.gid('tab-controller')).removeClass('hidden')
        }
      } else if (name === 'windows-open') {
        this.qs('main').className = !this.windowsOpen
          ? 'open-0'
          : `open-${this.windowsOpen}`
      }
    }
    zoomListener() {
      let slots = this.qsa('slot')
      slots.forEach((slot) => {
        let inner = slot.assignedNodes()
        if (inner[0]) {
          let wind = inner[0]
          wind.addEventListener('dblclick', (e) => {
            if (e.target === wind || wind.contains(e.target)) {
              e.stopPropagation()
              slot.classList.toggle('zoom')
            }
          })
          wind.addEventListener('wheel', (e) => {
            if (e.ctrlKey && e.deltaY > 0) {
              slot.classList.remove('zoom')
              e.preventDefault()
            }
          })
        }
      })
    }
    getUrl() {
      let our = $(this.gid('ship-input'))[0].value
      localStorage.setItem('our', our)
      const url = `https://bitdeg.arvo.network/apps/ship-url-getter/${our}`

      // fetch(url)
      //   .then((response) => {
      //     if (!response.ok) {
      //       // err handling
      //       throw new Error('Network response ' + response.statusText)
      //     }
      //     return response.json()
      //   })
      //   .then((data) => {
      // console.log('Success:', data)
      // console.log('URL: ' + data.url)
      // let rawUrl = data.url
      // let url = rawUrl.replace(/\/~\/eauth$/, '')
      // let rift = parseInt(data.rift, 10)
      // localStorage.setItem('local-url', url)
      // localStorage.setItem('rift', rift)
      this.postCode()
      // })
      // .catch((error) => {
      //   // err handling
      //   console.error('Error:', error)
      // })
    }
    async postCode() {
      let shipUrl = localStorage.getItem('local-url')
      localStorage.setItem('auth', true)
      this.initialLayout(`${shipUrl}`)
      $(this.gid('code-input'))[0].value = ''
      // let shipUrl = localStorage.getItem('local-url')
      // let rift = localStorage.getItem('rift')
      // let our = localStorage.getItem('our')
      // let ticket = $(this.gid('code-input'))[0].value

      // try {
      //   const kg = urbitKeyGeneration

      //   const wallet = await kg.generateWallet
      //   const ob = require('urbit-ob')({
      //     boot: false, // do not boot
      //     // TODO do not hardcode @p / AZP
      //     ship: ob.patp2dec(our),
      //     ticket: ticket
      //   })

      //   const networkSeed = kg.deriveNetworkSeed(
      //     wallet.management.seed,
      //     null,
      //     rift
      //   )
      //   //console.log(networkSeed)
      //   const networkKeys = kg.deriveNetworkKeys(networkSeed)
      //   //console.log(networkKeys)
      //   const lusCode = kg.generateCode(networkKeys)
      //   //console.log('+code: ' + kg.generateCode(networkKeys));

      //   //console.log(`${shipUrl}/~/login`)
      //   const url = `${shipUrl}/~/login`
      //   const body = `password=${lusCode}`

      //   // TODO Not compatible with https:// URLs
      //   fetch(url, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     body: body,
      //     credentials: 'include'
      //   })
      //     .then((response) => response.text())
      //     .then((data) => {
      //       console.log('Success:', data)
      //       localStorage.setItem('auth', true)
      //       this.initialLayout(`${shipUrl}`)
      //       $(this.gid('code-input'))[0].value = ''
      //     })
      //     .catch((error) => console.error('Error:', error))
      // } catch (err) {
      //   console.log('Error during log-in process: ' + err)
      // }
    }
    renderIcon(src) {
      let img = document.createElement('img')
      $(img).attr('src', src)
      $(img).addClass('icon-dark w20')
      return img
    }
    renderTabs() {
      let tabs = $(this.gid('tabs'))
      tabs.children().remove()
      let windowsOpen = this.windowsOpen
      let that = this

      $(this.windows).each(function (i) {
        let wind = this
        let tab = document.createElement('div')
        $(tab).addClass('br1 fr af js bw s17')
        if (i < windowsOpen) {
          $(tab).addClass('toggled')
        }
        let mux = document.createElement('button')
        mux.className = 'hover br1 bd0 p2 grow tl fr g2 ac js bw s17'
        mux.style =
          'overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;'
        let im = wind.getAttribute('favicon')
          ? `
        <img src="${wind.getAttribute(
          'favicon'
        )}" style="width: 20px; height: 20px;" />
        `
          : ``
        console.log('title', $(wind).attr('tab-title'))
        mux.innerHTML = `
        ${im}
        <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;">
          ${$(wind).attr('tab-title') || $(wind).attr('here')}
        </span>
      `
        let max = $(mux)
        $(max).on('click', () => {
          $(wind).trigger('maximize-window')
        })

        let min = document.createElement('button')
        $(min).append(that.renderIcon('./icons/minimize.svg'))
        $(min).addClass('br1 bd0 p1 bw s17')
        $(min).on('click', () => {
          $(wind).trigger('minimize-window')
        })
        if (i >= windowsOpen) {
          $(min).hide()
        }

        let zoom = document.createElement('button')
        $(zoom).append(that.renderIcon('./icons/max.svg'))
        $(zoom).addClass('br1 bd0 p1 bw s17')
        $(zoom).on('click', () => {
          $(wind).trigger('zoom-window')
        })
        if (i >= windowsOpen) {
          $(zoom).hide()
        }

        let close = document.createElement('button')
        $(close).append(that.renderIcon('./icons/close.svg'))
        $(close).addClass('br1 bd0 p1 bw s17')
        $(close).on('click', () => {
          $(wind).trigger('close-window')
        })

        $(tab).append(max)
        $(tab).append(min)
        $(tab).append(zoom)
        $(tab).append(close)
        tabs.append(tab)
      })

      let border = this.gid('bb')

      if (this.windows.length === 0) {
        border.classList.add('hidden')
      } else {
        border.classList.remove('hidden')
      }

      this.saveLayout()
    }
    fixSlots() {
      let slotted = $(this.windows).filter('[slot]').get().slice(0, 5)
      $(this.windows).removeAttr('slot')
      slotted.forEach((s, i) => {
        s.setAttribute('slot', `s${i}`)
      })
      console.log('slotted', slotted)
    }
    openWindow(e, here) {
      console.log('open window')
      let wind = document.createElement('wi-nd')
      let slot = e.detail && e.detail.slot ? e.detail.slot : `s-1`
      const setAttributes = (attributes) => {
        console.log('setting up', attributes)
        $(wind).attr(
          'favicon',
          attributes ? attributes.iconUrl : './icons/Landscape.svg'
        )
        $(wind).attr('tab-title', attributes ? attributes.title : 'Landscape')
        $(wind).attr('here', here)
        $(wind).attr('slot', slot)
        console.log('new-wind', wind)
        this.appendChild(wind)
        this.growFlock()
        this.fixSlots()
      }
      this.getIconUrl(here)
        .then((atributes) => {
          console.log('got icon and title', atributes)
          setAttributes(atributes)
        })
        .catch((error) => {
          console.log('error')
          setAttributes(null)
        })
    }
    growFlock() {
      let currentWindowsOpen = this.windowsOpen
      if (isNaN(currentWindowsOpen)) {
        currentWindowsOpen = 0
      }
      $(this).attr('windows-open', Math.min(5, currentWindowsOpen + 1))
    }
    shrinkFlock() {
      $(this).attr('windows-open', Math.max(0, this.windowsOpen - 1))
    }
    saveLayout() {
      let layout = {
        open: this.hasAttribute('open'),
        windowsOpen: parseInt(this.getAttribute('windows-open')),
        windows: $(this)
          .children('wi-nd')
          .get()
          .map((w) => {
            return {
              here: w.getAttribute('here'),
              slot: w.getAttribute('slot')
            }
          })
      }
      localStorage.setItem('sky-layout', JSON.stringify(layout))
    }
    restoreLayout() {
      let layoutString = localStorage.getItem('sky-layout')
      let authenticated = localStorage.getItem('auth')
      let showBridge = localStorage.getItem('show-bridge')
      if (!authenticated) {
        if (showBridge) {
          this.settingLayout(layoutString)
        } else {
          //  opening login setup
          this.qs('main').className = `open-login`
          $(this).addClass('login')
          //
          //  easy solution for now
          //
          if (layoutString) {
            $(this).children('wi-nd').remove()
            localStorage.removeItem('sky-layout')
          }
        }
        // disabling side-menu
        $(this.gid('sky-open')).removeClass('hover')
        $(this.gid('sky-open')).prop('disabled', true)
      } else if (!!layoutString && authenticated) {
        console.log('Restoring layout + Authenticated!')

        $(this).removeClass('login')
        //  enabling sidebar menu
        $(this.gid('sky-open')).addClass('hover')
        $(this.gid('sky-open')).prop('disabled', false)
        //  seting up windows layout
        this.settingLayout(layoutString)
        console.log('LAYOUT', layoutString)
      }
    }
    initialLayout(url) {
      // create initial layout
      let layout = {
        open: false,
        windowsOpen: 3,
        windows: [
          {
            here: `https://tolmud-tobtud.startram.io/~/login?/apps/landscape`,
            slot: 's0'
          },
          {
            here: `${window.location.origin}/forum`,
            slot: 's1'
          },
          {
            here: `${window.location.origin}/wallet`,
            slot: 's2'
          }
          // {
          //   here: `${window.location.origin}/file-app`,
          //   slot: 's3'
          // },
          // {
          //   here: `${window.location.origin}/watch`,
          //   slot: 's4'
          // }
        ]
      }
      localStorage.setItem('sky-layout', JSON.stringify(layout))
      this.restoreLayout()
    }
    settingLayout(layoutString) {
      let layout = JSON.parse(layoutString)
      $(this).attr('open', layout.open ? '' : null)
      $(this).attr('windows-open', `${layout.windowsOpen}`)
      $(this).children('wi-nd').remove()

      layout.windows.forEach((w) => {
        let wind = document.createElement('wi-nd')

        const setAttributes = (attributes) => {
          $(wind).attr(
            'favicon',
            attributes ? attributes.iconUrl : './icons/Landscape.svg'
          )
          $(wind).attr('tab-title', attributes ? attributes.title : 'Landscape')
          $(wind).attr('here', w.here)
          $(wind).attr('slot', w.slot || null)

          if (
            w.here === 'https://bridge.urbit.org/' ||
            w.here === 'https://bridge.urbit.org'
          ) {
            $(wind).attr('style', 'background: white;')
          }

          $(this).append(wind)
        }

        this.getIconUrl(w.here)
          .then((attributes) => {
            console.log('new-title', attributes)
            setAttributes(attributes)
          })
          .catch((error) => {
            setAttributes(null)
            console.error('Failed to get icon:', error)
          })
      })
    }
    getIconUrl(here) {
      return new Promise((resolve, reject) => {
        axios
          .get(here)
          .then((response) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(response.data, 'text/html')
            const iconLink = doc.querySelector("link[rel='icon']")
            const title = doc.querySelector('title')
              ? doc.querySelector('title').innerHTML
              : ''
            if (iconLink) {
              const iconUrl = new URL(iconLink.href, here).href
              console.log('resolve', title)
              resolve({ iconUrl, title })
              return
            } else {
              resolve(null)
              return
            }
          })
          .catch((error) => {
            console.error('Error fetching the URL:', error)
            reject(error)
          })
      })
    }
  }
)
