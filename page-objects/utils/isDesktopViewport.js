export const isDesktopViewport = (page) => {
    // 600 px is threshold for viewport
    const size = page.viewportSize() // returns width and height in pixels
    return size.width >= 600
}