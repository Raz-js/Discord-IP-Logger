//Custom-Error
if (window.location.href.search("spotify.com") == -1) {
    throw new Error("You ain't in spotify bro, if this isn't correct go to our support server! discord.gg/f83SxgJdAb");
}

//Already-Injected
if (window.TKInjected && !window.TKInjectedDebug) {
    throw new Error("Already ran Spotify Toolkit! Advanced: Set !Window.TKInjectedDebug to bypass this.");
}
window.TKInjected = true

//Const-Echo
		var echo = (function() {

			var queue = [];
			var ECHO_TOKEN = {};
			var RESET_INPUT = "%c ";
			var RESET_CSS = "";

			// Attach formatting utility method.
			function successFormatting( value ) {

				queue.push({
					value: value,
					css: "display: inline-block ; background-color: #1DB954 ; color: #191414 ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
				});

				return( ECHO_TOKEN );

			}

			// Attach formatting utility method.
			function warningFormatting( value ) {

				queue.push({
					value: value,
					css: "display: inline-block ; background-color: gold ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
				});

				return( ECHO_TOKEN );

			}

			// I provide an echo-based proxy to the given Console Function. This uses an
			// internal queue to aggregate values before calling the given Console
			// Function with the desired formatting.
			function using( consoleFunction ) {

				function consoleFunctionProxy() {

					// As we loop over the arguments, we're going to aggregate a set of
					// inputs and modifiers. The Inputs will ultimately be collapsed down
					// into a single string that acts as the first console.log parameter
					// while the modifiers are then SPREAD into console.log as 2...N.
					// --
					// NOTE: After each input/modifier pair, I'm adding a RESET pairing.
					// This implicitly resets the CSS after every formatted pairing.
					var inputs = [];
					var modifiers = [];

					for ( var i = 0 ; i < arguments.length ; i++ ) {

						// When the formatting utility methods are called, they return
						// a special token. This indicates that we should pull the
						// corresponding value out of the QUEUE instead of trying to
						// output the given argument directly.
						if ( arguments[ i ] === ECHO_TOKEN ) {

							var item = queue.shift();

							inputs.push( ( "%c" + item.value ), RESET_INPUT );
							modifiers.push( item.css, RESET_CSS );

						// For every other argument type, output the value directly.
						} else {

							var arg = arguments[ i ];

							if (
								( typeof( arg ) === "object" ) ||
								( typeof( arg ) === "function" )
								) {

								inputs.push( "%o", RESET_INPUT );
								modifiers.push( arg, RESET_CSS );

							} else {

								inputs.push( ( "%c" + arg ), RESET_INPUT );
								modifiers.push( RESET_CSS, RESET_CSS );

							}

						}

					}

					consoleFunction( inputs.join( "" ), ...modifiers );

					// Once we output the aggregated value, reset the queue. This should have
					// already been emptied by the .shift() calls; but the explicit reset
					// here acts as both a marker of intention as well as a fail-safe.
					queue = [];

				}

				return( consoleFunctionProxy );

			}

			return({
				// Console(ish) functions.
				log: using( console.log ),
				warn: using( console.warn ),
				error: using( console.error ),
				trace: using( console.trace ),
				group: using( console.group ),
				groupEnd: using( console.groupEnd ),

				// Formatting functions.
				asSuccess: successFormatting,
				asWarning: warningFormatting
			});

		})();

//Delete-Class-Func
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Theme-Const
const injectTKCss = (id, css) => {
  const style = document.createElement("style")
  style.setAttribute(`css`, id)
  style.innerHTML = css
  document.head.appendChild(style)
}

const ejectTKCss = (id) => {
  const style = document.querySelector(`style[css="${id}"]`)
  if (style) style.remove()
}
//End

//Toast-InnerHTML
injectTKCss("toasts-css", `.dt-toast { 
  display: inline-flex; 
  box-sizing: border-box; 
  border-radius: 3px; 
  color: var(--text-normal); 
  font-size: 16px; 
  background-color: #040b03; 
  vertical-align: bottom; 
  box-shadow: var(--elevation-low); 
  margin: 0 10px 0 auto; 
  flex-grow: 1; 
  opacity: 1; 
  transition: opacity 0.3s ease-in-out; 
  width: fit-content; 
} 
.dt-toast.adding { 
  opacity: 0 
} 
.dt-toast.removing { 
  opacity: 0 
} 
.dt-toast:not(:last-child) { 
  margin-bottom: 5px 
} 
.dt-toast-container { 
  position: absolute; 
  bottom: 0; 
  right: 0; 
  display: flex; 
  flex-direction: column; 
  align-items: flex-end; 
  max-width: 100%; 
  z-index: 999; 
  overflow: hidden; 
} 
.dt-toast-wrapper { 
  overflow: hidden; 
  height: auto; 
  margin: 0; 
  border-radius: 3px; 
  display: flex; 
  flex-direction: column; 
  min-width: auto; 
  transition-property: all; 
  transition-timing-function: ease; 
  transition-duration: 0.5s; 
} 
.dt-toast-type { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-width: 18px; 
  margin-right: 5px; 
  border-radius: 3px 0 0 3px; 
  background-color: transparent; 
  position: relative; 
} 
.dt-toast-type::after { 
  content: ""; 
  position: absolute; 
  background-color: #040b03; 
  width: 6px; 
  border-radius: 6px; 
  height: 100%; 
  right: -3px; 
} 
.dt-toast-type.success { 
  background-color: #0f6509; 
} 
.dt-toast-type.error { 
  background-color: var(--info-danger-foreground); 
} 
.dt-toast-type.info { 
  background-color: var(--brand-experiment); 
} 
.dt-toast-type.warning { 
  background-color: var(--info-warning-foreground); 
} 
.dt-toast-message { 
  display: inline-block; 
  user-select: text; 
} 
.dt-toast-message-wrapper { 
  flex: 1; 
  padding: 12px 6px 12px 3px; 
  position: relative; 
} 
.dt-toast-close { 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  padding: 2px 10px 0; 
  user-select: none; 
  color: var(--interactive-normal); 
  position: relative; 
  font-size: 14px; 
} 
.dt-toast-close:hover { 
  color: var(--interactive-hover); 
  background: linear-gradient(90deg, rgba(1,255,0,0) 0%, rgba(39,180,29,1) 40%);
}`)

//Toast-Container
const toastContainer = document.createElement("div");
toastContainer.className = "dt-toast-container";
document.body.appendChild(toastContainer);
const toastWrapper = document.createElement("div");
toastWrapper.className = "dt-toast-wrapper";
toastWrapper.style.marginBottom = "5px";
toastContainer.appendChild(toastWrapper);
function Timer(callback, delay) {
    let timerId, start, remaining = delay;
    const pause = function () {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };
    const resume = function () {
        if (timerId)
            return;
        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };
    resume();
    return { pause, resume };
}

//Toast-Const
function ls8sdajw8asjdia(text, options={}) {
    const { type = "success", duration = 3000, autoClose = true, closeButton = true } = options;
    if (!autoClose && !closeButton)
        throw new Error("You can't have autoClose and closeButton disabled");
    const toast = document.createElement("div");
    toast.className = "dt-toast adding";
    setTimeout(() => toast.classList.remove("adding"), 300);
    toastWrapper.appendChild(toast);
    const toastType = document.createElement("span");
    toastType.className = `dt-toast-type ${type.toLowerCase()}`;
    toast.appendChild(toastType);
    const toastMessageWrapper = document.createElement("div");
    toastMessageWrapper.className = "dt-toast-message-wrapper";
    toast.appendChild(toastMessageWrapper);
    const toastMessage = document.createElement("span");
    toastMessage.className = "dt-toast-message";
    toastMessage.innerText = text;
    toastMessageWrapper.appendChild(toastMessage);
    function removeToast() {
        toast.classList.add("removing");
        setTimeout(() => toast.remove(), 300);
    }
    if (closeButton) {
        const toastClose = document.createElement("span");
        toastClose.className = "dt-toast-close";
        toastClose.innerText = "✕";
        toastClose.onclick = removeToast;
        toast.appendChild(toastClose);
    }
    const dur = Timer(() => autoClose && removeToast(), duration);
    toast.onmouseenter = dur.pause;
    toast.onmouseleave = dur.resume;
    return toast;
}

//----------------------------------------------

//Theme-Func
function theme () {
injectTKCss("Original", `.logo { color: #f00 }
.epWhU7hHGktzlO_dop6z { background-color: #b71010 }
.TywOcKZEqNynWecCiATc { --is-active-fg-color: #46170a }
.hDgDGI { color: red }
.Wc0Ez_RFAJ2dDcMEL0K6 { color: green }
.encore-dark-theme .encore-bright-accent-set { --background-base: #1c3324; --background-highlight: #000000 }
.control-button:focus, .control-button:hover { color: #1db954 }
.FMNZJaO_Zs9C_4inzm52 { background: linear-gradient(135deg,#1d1d1d,#c4efd9) }
.eHgQDo { color: #844242 }
.U05tnfKJjzV3lfrwRbLN { height: 359px }`)
}

//----------------------------------------------

//Help-Command
var tk = {
  get help () {
    echo.log(echo.asWarning( "If nothing popped up in the corner of your screen, please go to our discord server | discord.gg/TZYzNPBN7C |" ));
    ls8sdajw8asjdia("Edit your theme via the non-obfusticated part\nof the code and use the toggle theme\nbutton on spotify to execute your theme <3")
  },
  get info () {
    echo.log(echo.asWarning( "If nothing popped up in the corner of your screen, please go to our discord server | discord.gg/TZYzNPBN7C |" ));
    ls8sdajw8asjdia("𝐂𝐡𝐚𝐧𝐠𝐞𝐥𝐨𝐠:\n- Premium Hack\n- Theme Changer\nᴏᴛʜᴇʀ: Help = tk.help")
  }
}

//Main-Button
let tkBtn = document.createElement("button");
tkBtn.innerHTML = "Toggle Theme";
tkBtn.className = "tkBtn";
tkBtn.id = "tkBtn";
tkBtn.style = "background-color: #181818; padding: 0; border: none";
tkBtn.value = "OFF";
tkBtn.onclick = function () {
  ls8sdajw8asjdia("Toggled Theme")
 if(document.getElementById("tkBtn").value=="OFF")
              {
               document.getElementById("tkBtn").value="ON";
	       theme()
              }
              else
              {
                document.getElementById("tkBtn").value="OFF";
		ejectTKCss("Original")
              }
};
document.body.appendChild(tkBtn);

//Mute-Spotify-Ads
!async function () {

    async function queryAsync(query) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                const element = document.querySelector(query);
                if (element) {
                    clearInterval(interval);
                    return resolve(element);
                }
            }, 250);
        });
    }

    const nowPlayingBar = await queryAsync('.Root__now-playing-bar');
    const volumeButton = await queryAsync('button.volume-bar__icon-button');
    const adQuerySelector = '.Root__now-playing-bar *[aria-label~=Advertisement]';

    let playInterval;
    new MutationObserver(() => {
        if (document.querySelector(adQuerySelector) &&
            volumeButton.attributes['aria-label'].value.toLowerCase().indexOf('unmute') == -1) {
            volumeButton.click();
            if (!playInterval) {
                playInterval = setInterval(() => {
                    if (!document.querySelector(adQuerySelector)) {
                        clearInterval(playInterval);
                        playInterval = null;
                        volumeButton.click();
                    }
                }, 500);
            }
        }
    }).observe(nowPlayingBar, {
        characterData: true,
        childList: true,
        attributes: true,
        subtree: true
    });
}();

//showToast
ls8sdajw8asjdia("Injected Spotify Toolkit By Raz <3")

//After-Inject
let title_el = document.querySelector("title");
if(title_el)
    title_el.innerHTML = "[Injected] Spotify Toolkit";
if(clear) clear()
else console.clear()
echo.log(echo.asSuccess( "[Injected] Spotify Toolkit" ))
console.log('%cFor more info use the command: "tk.info" below 👇', 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; font-style: italic; border: 2px solid white; margin: 30px;');
