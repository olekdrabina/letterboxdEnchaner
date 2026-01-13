const selectorsToRemove = [
    "#film-page-wrapper > div.col-17 > section.section-margin.film-news",
    "#film-page-wrapper > div.col-17 > section.section.related-films.-clear > div.nanocrowd-attribution.-is-not-stacked",
    "#film-hq-mentions",
    "#content > div > div > aside > section.activity-settings.js-activity-filters.pro-message > form > small",
]
 
// remove ads
const ads = Array.from(document.querySelectorAll('div.banner.banner-950.js-hide-in-app, div.banner.banner-250.js-hide-in-app, div.banner.banner-230.js-hide-in-app')).filter(ad =>
    ad.querySelector('a[href="/pro/?utm_medium=banner&utm_campaign=get-pro"]')
)
ads.forEach(ad => ad.remove())
document.querySelectorAll(".upgrade-kicker").forEach(kicker => kicker.remove())

// function that run after passiveCooldown ms
const passiveCooldown = 500
function passive() {
    // remove patron ad on film page
    const filmPagePatronAd = document.querySelector("#userpanel > ul > li:nth-child(6) > a > span").parentElement.parentElement
    if (filmPagePatronAd) filmPagePatronAd.remove()

    // remove selectors
    selectorsToRemove.forEach(selector => {
        let selectorHTML = document.querySelector(selector)
        if (selectorHTML) selectorHTML.remove()
    })

    // make reviews & network page wider
    if (window.location.href.endsWith("/reviews/") || window.location.href.endsWith("/following/")) {
        const reviews = document.querySelector("#content > div > section.section.col-main.overflow.col-17")
        if (reviews) reviews.style.width = "100%"
        const network = document.querySelector("#content > div > div > section")
        if (network) network.style.width = "100%"
    }

    // activity settings
    const activitySettingsForm = document.querySelector("#content > div > div > aside > section.activity-settings.js-activity-filters.pro-message > form")
    if (activitySettingsForm) activitySettingsForm.style.paddingBottom = 0
    const activitySettingsBtn1 = document.querySelector("#content > div > div > aside > section.activity-settings.js-activity-filters.pro-message > form > label:nth-child(1)")
    if (activitySettingsBtn1) activitySettingsBtn1.style.paddingTop = "12px"
    const activitySettingsBtn2 = document.querySelector("#content > div > div > aside > section.activity-settings.js-activity-filters.pro-message > form > label.option-label.-toggle.-small.switch-control.-block.-highcontrast.divider")
    if (activitySettingsBtn2) activitySettingsBtn2.style.borderBottom = "none"
    
    // move rental slightly lower
    const observer2 = new MutationObserver((mutations, obs) => {
        const el = document.querySelector("#user-homepage-container > div.videostore-feature.section")
        if (el) {
            const next = el.nextElementSibling
            if (next) next.after(el)
            document.querySelector(".pw-div -nomargin -bottommargin").remove()
            obs.disconnect()
        }
    })
    observer2.observe(document.body, {childList: true, subtree: true})

    // where to watch – remove the parent if not streaming
    const justWatchMessage = document.querySelector("#watch > div.other.-message")
    if (justWatchMessage) {
        if (justWatchMessage.innerHTML.trim() == "Not streaming.") {
            if (window.location.href.startsWith("https://letterboxd.com/film/")) {
                document.querySelector("#js-poster-col > section.watch-panel.js-watch-panel > div.header").remove()
                document.querySelector("#js-poster-col > section.watch-panel.js-watch-panel").remove()
            } else {
                document.querySelector("#content > div > div > section > div.col-4.gutter-right-1 > section.watch-panel.js-watch-panel").remove()
            }
        } else document.querySelector("#watch > div.other.-message").remove()
    }

    // people pages share border-radius
    peopleShare = document.querySelector("#userpanel > ul > li")
    if (peopleShare) peopleShare.style.borderRadius = "3px"
}

setTimeout(() => {
    passive()
}, passiveCooldown)