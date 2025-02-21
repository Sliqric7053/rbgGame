
import * as THREE from 'three';
import { gsap } from 'gsap';

class ColorGame {
    constructor() {
        this.colors = [];
        this.pickedColor = null;
        this.gameContainer = document.getElementById('canvas-container');
        this.colorDisplay = document.getElementById('color-display');
        this.messageDisplay = document.getElementById('message');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = document.querySelectorAll('.mode');
        this.numCubes = 6;
        
        this.setupScene();
        this.setupGame();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.gameContainer.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        this.cubes = [];
    }

    setupGame() {
        this.resetButton.addEventListener('click', () => this.reset());
        
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.modeButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                this.numCubes = button.textContent === 'Easy' ? 3 : 6;
                this.reset();
            });
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.reset();
    }

    reset() {
        this.colors = this.generateRandomColors(this.numCubes);
        this.pickedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.colorDisplay.textContent = this.pickedColor;
        this.messageDisplay.textContent = '';
        this.resetButton.textContent = 'New Colors';

        // Remove existing cubes
        this.cubes.forEach(cube => this.scene.remove(cube));
        this.cubes = [];

        // Create new cubes
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        for (let i = 0; i < this.colors.length; i++) {
            const material = new THREE.MeshPhongMaterial({ color: this.colors[i] });
            const cube = new THREE.Mesh(geometry, material);
            
            const row = Math.floor(i / 3);
            const col = i % 3;
            cube.position.set(col * 2 - 2, row * -2 + 1, 0);
            
            cube.userData.color = this.colors[i];
            cube.addEventListener('click', () => this.checkColor(cube));
            
            this.cubes.push(cube);
            this.scene.add(cube);
        }
    }

    generateRandomColors(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(this.randomColor());
        }
        return arr;
    }

    randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    checkColor(cube) {
        if (cube.userData.color === this.pickedColor) {
            this.messageDisplay.textContent = 'Correct!';
            this.resetButton.textContent = 'Play Again?';
            this.changeColors(this.pickedColor);
        } else {
            gsap.to(cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            this.messageDisplay.textContent = 'Try Again';
        }
    }

    changeColors(color) {
        this.cubes.forEach(cube => {
            gsap.to(cube.rotation, {
                x: Math.PI * 2,
                y: Math.PI * 2,
                duration: 1,
                ease: 'power2.out'
            });
            cube.material.color.setStyle(color);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

new ColorGame();
