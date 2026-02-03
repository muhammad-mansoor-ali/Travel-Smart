/* js/data.js */
window.TRAVEL_DATA = [
  {id:1,name:'Maldives Escape',type:'beach',price:1299,popularity:98,rating:4.9,duration:5,hero:'assets/maldives.jpeg',description:'Luxury beach resort stay with snorkeling and island hopping.'},
  {id:2,name:'Karachi → Hunza Trek',type:'mountain',price:799,popularity:89,rating:4.8,duration:7,hero:'assets/mountain.jpg',description:'Guided trek across the scenic Karakoram range.'},
  {id:3,name:'Istanbul City Break',type:'city',price:499,popularity:82,rating:4.5,duration:3,hero:'assets/city.avif',description:'Historic city tour, Bosphorus cruise and culinary experiences.'},
  {id:4,name:'Sri Lanka Surf & Culture',type:'beach',price:649,popularity:76,rating:4.4,duration:6,hero:'assets/beach.jpeg',description:'Surf lessons, tea plantation visit and wildlife safari.'},
  {id:5,name:'Everest Base Trek (Intro)',type:'mountain',price:999,popularity:91,rating:4.7,duration:10,hero:'assets/mountain.jpg',description:'Lifetime trekking experience with acclimatized stages.'},
  {id:6,name:'Dubai Luxury City Tour',type:'city',price:599,popularity:87,rating:4.6,duration:4,hero:'assets/desertsafari.jpg',description:'Skyscrapers, desert dune bashing and shopping.'},
  {id:7,name:'Thailand Island Hopper',type:'beach',price:549,popularity:84,rating:4.5,duration:6,hero:'assets/maldivesbeach.jpg',description:'Island hopping across Phi Phi and Phuket with boat rides.'},
  {id:8,name:'Patagonia Adventure',type:'adventure',price:1399,popularity:71,rating:4.6,duration:12,hero:'assets/antartic desert.jpg',description:'Wild landscapes, glaciers, and guided hikes.'},
  {id:9,name:'Tokyo Urban Experience',type:'city',price:799,popularity:80,rating:4.7,duration:5,hero:'assets/tokyo.jpg',description:'Technology tours, food markets, and cultural visits.'},
  {id:10,name:'Amazon Rainforest Lodge',type:'adventure',price:1199,popularity:69,rating:4.6,duration:8,hero:'assets/huts.jpeg',description:'Wildlife, river safaris and guided nature walks.'},
  {id:11,name:'Paris Romantic Getaway',type:'city',price:1599,popularity:95,rating:4.8,duration:5,hero:'assets/paris.jpeg',description:'Experience the romance of Paris with guided tours and fine dining.'},
  {id:12,name:'Costa Rica Eco-Adventure',type:'adventure',price:1099,popularity:88,rating:4.7,duration:8,hero:'assets/rica.avif',description:'Zip-lining, rainforest treks, and wildlife spotting in Costa Rica.'},
  {id:13,name:'Sahara Desert Expedition',type:'adventure',price:899,popularity:83,rating:4.6,duration:6,hero:'assets/desert.jpg',description:'Camel treks and camping under the stars in the Sahara.'},
  {id:14,name:'Nordic Northern Lights',type:'mountain',price:1899,popularity:92,rating:4.9,duration:7,hero:'assets/aurora.avif',description:'Chase the Aurora Borealis and stay in a glass igloo.'},
  {id:15,name:'Swiss Alps Skiing',type:'mountain',price:2199,popularity:94,rating:4.9,duration:7,hero:'assets/sem_swiss_alps.png',description:'World-class skiing and cozy chalets in the Swiss Alps.'},
  {id:16,name:'New York City Break',type:'city',price:1299,popularity:96,rating:4.7,duration:5,hero:'assets/city.avif',description:'Experience the Big Apple with Broadway shows and fine dining.'},
  {id:17,name:'African Safari',type:'adventure',price:2499,popularity:89,rating:4.9,duration:10,hero:'assets/desertsafari.jpg',description:'Witness the majesty of African wildlife in their natural habitat.'},
  {id:18,name:'Kyoto Cherry Blossoms',type:'city',price:1699,popularity:91,rating:4.8,duration:8,hero:'assets/tokyo.jpg',description:'Walk through blooming cherry blossom tunnels in historic Kyoto.'}
];

// Global itinerary data
window.ITINERARIES = {
  1: [
    { day: 'Day 1', title: 'Arrival & Welcome', content: 'Arrive at Malé International Airport. Transfer to your resort. Welcome dinner and orientation.' },
    { day: 'Day 2', title: 'Snorkeling Adventure', content: 'Morning snorkeling session to explore vibrant coral reefs. Afternoon at leisure. Sunset cruise.' },
    { day: 'Day 3', title: 'Island Hopping', content: 'Visit local islands, experience Maldivian culture, and enjoy water sports activities.' },
    { day: 'Day 4', title: 'Relaxation & Spa', content: 'Full day at the resort. Enjoy spa treatments, beach activities, and fine dining.' },
    { day: 'Day 5', title: 'Departure', content: 'Check out and transfer to airport for your flight home.' }
  ],
  3: [
    { day: 'Day 1', title: 'Arrival in Istanbul', content: 'Arrive at Istanbul Airport. Transfer to hotel. Evening Bosphorus cruise with dinner.' },
    { day: 'Day 2', title: 'Historic Sites', content: 'Visit Hagia Sophia, Blue Mosque, and Topkapi Palace. Explore Grand Bazaar.' },
    { day: 'Day 3', title: 'Cultural Experience', content: 'Turkish cooking class, visit to Spice Bazaar, and traditional Turkish bath experience.' }
  ],
  5: [
    { day: 'Day 1-2', title: 'Arrival & Acclimatization', content: 'Arrive in Kathmandu. Briefing and preparation. Acclimatization walks.' },
    { day: 'Day 3-5', title: 'Trek to Base Camp', content: 'Begin trek through Sherpa villages. Gradual ascent with rest days for acclimatization.' },
    { day: 'Day 6-8', title: 'Base Camp Exploration', content: 'Reach Everest Base Camp. Explore the area, visit Khumbu Icefall viewpoint.' },
    { day: 'Day 9-10', title: 'Return Journey', content: 'Descend back to Lukla. Celebration dinner and cultural program.' }
  ]
};

// Travel Tips Blog Data
window.BLOG_POSTS = {
  1: {
    title: 'The Ultimate Packing Checklist',
    date: 'Feb 2, 2026',
    category: 'Travel Guide',
    image: 'assets/checklist.jpg',
    content: `
      <p>Packing efficiently is an art form. Whether you're a minimalist traveler or someone who needs options, having a solid checklist ensures you never leave essentials behind.</p>
      <h3>The Essentials</h3>
      <ul>
        <li><strong>Documents:</strong> Passport, Visa, ID, Boarding Passes, Hotel Reservations.</li>
        <li><strong>Electronics:</strong> Universal adapter, power bank, charging cables, camera.</li>
        <li><strong>Toiletries:</strong> Toothbrush, toothpaste, sunscreen, sanitizer, prescription meds.</li>
        <li><strong>Clothing:</strong> Layers are key! Pack versatile pieces that can be mixed and matched.</li>
      </ul>
      <h3>Pro Tips</h3>
      <p>Roll your clothes to save space and reduce wrinkles. Use packing cubes to organize by category. Always keep a digital copy of your important documents in the cloud.</p>
    `
  },
  2: {
    title: 'Hidden Gems in Tokyo',
    date: 'Jan 28, 2026',
    category: 'Destinations',
    image: 'assets/tokyo.jpg',
    content: `
      <p>Tokyo is a bustling metropolis, but beyond the neon lights of Shibuya and Shinjuku, there are quiet corners filled with history and charm.</p>
      <h3>Yanaka Ginza</h3>
      <p>Step back in time in this old-town district. It survived WWII bombings and retains a nostalgic atmosphere with traditional shops and stray cats.</p>
      <h3>Golden Gai</h3>
      <p>A network of six narrow alleys in Shinjuku, packed with over 200 tiny bars. Each has its own unique theme and personality.</p>
      <h3>Todoroki Valley</h3>
      <p>A surprising jungle oasis in the middle of the city. A walking trail takes you along a stream, past shrines and tea houses.</p>
    `
  },
  3: {
    title: 'Solo Travel 101',
    date: 'Jan 15, 2026',
    category: 'Tips',
    image: 'assets/rica.avif',
    content: `
      <p>Traveling alone can be daunting, but it's also one of the most rewarding experiences. It offers freedom, self-discovery, and the chance to meet new people.</p>
      <h3>Safety First</h3>
      <p>Always share your itinerary with someone back home. Trust your instincts. Research local scams and dangerous areas beforehand.</p>
      <h3>Meeting People</h3>
      <p>Stay in hostels or use apps to meet other travelers. Join walking tours or cooking classes to connect with like-minded individuals.</p>
      <h3>Embrace Loneliness</h3>
      <p>It's okay to feel lonely sometimes. Use that time to journal, read, or simply observe the world around you.</p>
    `
  }
};
