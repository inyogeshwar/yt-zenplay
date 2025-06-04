const YOUTUBE_URL_PATTERN = "*://*.youtube.com/*";

let activeTabId = null;
let autoPauseEnabled = true;
let autoPlayEnabled = true;
let pauseOnInactiveEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ autoPauseEnabled, autoPlayEnabled, pauseOnInactiveEnabled });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com')) {
        handleTabUpdate(tabId, tab);
    }
});

chrome.tabs.onActivated.addListener(activeInfo => {
    activeTabId = activeInfo.tabId;
    notifyTabSwitch(activeInfo.tabId);
});

function handleTabUpdate(tabId, tab) {
    if (tabId !== activeTabId && autoPauseEnabled) {
        chrome.tabs.executeScript(tabId, { file: "content/youtube-controller.js" });
    } else if (tabId === activeTabId && autoPlayEnabled) {
        chrome.tabs.executeScript(tabId, { file: "content/youtube-controller.js" });
    }
}

function notifyTabSwitch(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        if (tab.url.includes('youtube.com')) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'assets/icons/icon48.svg',
                title: 'YouTube Tab Switched',
                message: `You are now watching: ${tab.title}`
            });
        }
    });
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.autoPauseEnabled) {
        autoPauseEnabled = changes.autoPauseEnabled.newValue;
    }
    if (changes.autoPlayEnabled) {
        autoPlayEnabled = changes.autoPlayEnabled.newValue;
    }
    if (changes.pauseOnInactiveEnabled) {
        pauseOnInactiveEnabled = changes.pauseOnInactiveEnabled.newValue;
    }
});