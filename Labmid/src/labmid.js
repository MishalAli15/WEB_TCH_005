
document.addEventListener('alpine:init', () => {
    Alpine.data('slider', () => ({
        currentIndex: 1,
        images: [
            'https://source.unsplash.com/1600x900/?resorts',
            'https://source.unsplash.com/1600x900/?hotels',
            'https://source.unsplash.com/1600x900/?journey',
            'https://source.unsplash.com/1600x900/?best rooms',
            'https://source.unsplash.com/1600x900/?comfortable'
        ],
        back() {
            if (this.currentIndex > 1) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        next() {
            if (this.currentIndex < this.images.length) {
                this.currentIndex = this.currentIndex + 1;
            } else if (this.currentIndex <= this.images.length){
                this.currentIndex = this.images.length - this.currentIndex + 1
            }
        },
    }))
})



document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    logo.onclick = function() {
        const rollNumber = "FA20-BCS-005"; // Replace with your actual roll number
        alert('MISHAL ALI ' + rollNumber);
    };
});

