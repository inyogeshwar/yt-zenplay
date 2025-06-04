const youtubeController = (() => {
    let isPaused = false;
    let autoPauseInactive = true;

    const init = () => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === "togglePause") {
                isPaused = !isPaused;
                handlePlayback();
            } else if (request.action === "setAutoPause") {
                autoPauseInactive = request.value;
            }
        });

        document.addEventListener("visibilitychange", () => {
            if (autoPauseInactive) {
                handlePlayback();
            }
        });

        handlePlayback();
    };

    const handlePlayback = () => {
        const video = document.querySelector("video");
        if (video) {
            if (isPaused || document.hidden) {
                video.pause();
            } else {
                video.play();
            }
        }
    };

    return {
        init,
    };
})();

youtubeController.init();