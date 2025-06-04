const tabManager = (() => {
    let activeTabId = null;
    let youtubeTabs = new Set();
    let isPausedOnInactive = false;

    const init = () => {
        chrome.tabs.onUpdated.addListener(handleTabUpdate);
        chrome.tabs.onActivated.addListener(handleTabActivation);
    };

    const handleTabUpdate = (tabId, changeInfo, tab) => {
        if (tab.url && tab.url.includes("youtube.com")) {
            if (changeInfo.status === 'complete') {
                youtubeTabs.add(tabId);
                if (activeTabId !== tabId) {
                    chrome.tabs.sendMessage(tabId, { action: 'pause' });
                } else {
                    chrome.tabs.sendMessage(tabId, { action: 'play' });
                }
            }
        }
    };

    const handleTabActivation = (activeInfo) => {
        if (youtubeTabs.has(activeInfo.tabId)) {
            activeTabId = activeInfo.tabId;
            chrome.tabs.sendMessage(activeTabId, { action: 'play' });
            notifyTabSwitch(activeTabId);
            pauseOtherTabs(activeTabId);
        }
    };

    const pauseOtherTabs = (activeTabId) => {
        youtubeTabs.forEach(tabId => {
            if (tabId !== activeTabId) {
                chrome.tabs.sendMessage(tabId, { action: 'pause' });
            }
        });
    };

    const notifyTabSwitch = (tabId) => {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/icons/icon48.svg',
            title: 'YouTube Tab Switched',
            message: `You are now watching a video on tab ${tabId}.`
        });
    };

    const setPauseOnInactive = (value) => {
        isPausedOnInactive = value;
    };

    return {
        init,
        setPauseOnInactive
    };
})();

tabManager.init();