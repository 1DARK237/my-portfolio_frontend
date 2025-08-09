document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');

    // This is where you would define your project data
    const projects = {
        '1': {
            title: 'Project 1 Title',
            description: 'This is a detailed description of Project 1. It was a fascinating project where I applied my skills in...',
            image: 'assets/images/work-full/full-1.jpg',
            hoverImage: 'assets/images/work-thumb/thumb-1.jpg' // New hover image property
        },
        '2': {
            title: 'Project 2 Title',
            description: 'A brief overview of Project 2, highlighting the key challenges and the creative solution I implemented.',
            image: 'assets/images/work-full/full-2.jpg',
            hoverImage: 'assets/images/work-thumb/thumb-2.jpg'
        },

        '3': {
            title: 'Project 3 Title',
            description: 'A brief overview of Project 3, highlighting the key challenges and the creative solution I implemented.',
            image: 'assets/images/work-full/full-3.jpg',
            hoverImage: 'assets/images/work-thumb/thumb-3.jpg'
        },

        '4': {
            title: 'Project 4 Title',
            description: 'A brief overview of Project 4, highlighting the key challenges and the creative solution I implemented.',
            image: 'assets/images/work-full/full-4.jpg',
            hoverImage: 'assets/images/work-thumb/thumb-4.jpg'
        }
    };

    gridItems.forEach(item => {
        // Handle click event for the full pop-up modal
        item.addEventListener('click', () => {
            const projectId = item.dataset.projectId;
            const project = projects[projectId];

            if (project) {
                modalImage.src = project.image;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modal.style.display = 'block';
            }
        });

        // Handle hover events for the tiny thumbnail pop-up
        item.addEventListener('mouseenter', () => {
            const projectId = item.dataset.projectId;
            const project = projects[projectId];

            if (project && project.hoverImage) {
                // Create and append the pop-up thumbnail
                const hoverThumbnail = document.createElement('img');
                hoverThumbnail.classList.add('hover-thumbnail-popup');
                hoverThumbnail.src = project.hoverImage;
                item.appendChild(hoverThumbnail);

                // Add a small delay to trigger the transition effect
                setTimeout(() => {
                    hoverThumbnail.classList.add('active');
                }, 10);
            }
        });

        item.addEventListener('mouseleave', () => {
            const hoverThumbnail = item.querySelector('.hover-thumbnail-popup');
            if (hoverThumbnail) {
                // Remove the pop-up thumbnail
                hoverThumbnail.classList.remove('active');
                setTimeout(() => {
                    hoverThumbnail.remove();
                }, 300); // Wait for the transition to finish before removing
            }
        });
    });

    // Close button and window click handlers for the modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});