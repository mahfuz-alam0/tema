$(document).ready(function() {
    const $slider = $('.SliderMain');
    const $items = $('.slideItem');
    const itemWidth = $items.outerWidth(true);
    const totalItems = $items.length;
    let isDragging = false;
    let startX, scrollLeft, newScrollLeft;

    // Function to start dragging
    $slider.on('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - $slider.offset().left;
        scrollLeft = $slider.scrollLeft();
        $items.addClass('grabbing'); // Add the grabbing class
    });

    // Function to drag the slider
    $(document).on('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - $slider.offset().left;
        const walk = (x - startX) * 2; // Adjust sensitivity
        newScrollLeft = scrollLeft - walk;
        $slider.scrollLeft(newScrollLeft);
    });

    // Function to stop dragging
    $(document).on('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            $items.removeClass('grabbing'); // Remove the grabbing class
        }
    });

    // Optional: Adjust for touch events
    $slider.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].pageX - $slider.offset().left;
        scrollLeft = $slider.scrollLeft();
    });

    $slider.on('touchmove', function(e) {
        const x = e.originalEvent.touches[0].pageX - $slider.offset().left;
        const walk = (x - startX) * 2; // Adjust sensitivity
        newScrollLeft = scrollLeft - walk;
        $slider.scrollLeft(newScrollLeft);
    });

    // Navigation buttons
    $('#prev').on('click', function() {
        $slider.animate({
            scrollLeft: $slider.scrollLeft() - itemWidth
        }, 300);
    });

    $('#next').on('click', function() {
        $slider.animate({
            scrollLeft: $slider.scrollLeft() + itemWidth
        }, 300);
    });
});
