document.addEventListener('DOMContentLoaded', function () {
    const autoPauseCheckbox = document.getElementById('auto-pause');
    const autoPlayCheckbox = document.getElementById('auto-play');
    const tabInactivePauseCheckbox = document.getElementById('tab-inactive-pause');

    // Load saved preferences
    chrome.storage.sync.get(['autoPause', 'autoPlay', 'tabInactivePause'], function (data) {
        autoPauseCheckbox.checked = data.autoPause !== undefined ? data.autoPause : true;
        autoPlayCheckbox.checked = data.autoPlay !== undefined ? data.autoPlay : true;
        tabInactivePauseCheckbox.checked = data.tabInactivePause !== undefined ? data.tabInactivePause : false;
    });

    // Save preferences on change
    autoPauseCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ autoPause: autoPauseCheckbox.checked });
    });

    autoPlayCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ autoPlay: autoPlayCheckbox.checked });
    });

    tabInactivePauseCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ tabInactivePause: tabInactivePauseCheckbox.checked });
    });
});