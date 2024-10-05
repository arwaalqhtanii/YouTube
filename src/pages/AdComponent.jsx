
export default function AdComponent() {
    return (
      <div className="bg-gray-900 p-4 rounded-md">
        <h3 className="text-lg font-bold text-white mb-2">Follow me on LinkedIn</h3>
        <img 
          src="https://media.licdn.com/dms/image/v2/D4E03AQG4xlBy2TF1MQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702393212858?e=1733356800&v=beta&t=QFUQ1b1mYPipZ7_OvM9Y8QMtejoBg3JOfzeWjctwTjs" 
          alt="LinkedIn" 
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <p className="text-gray-400 mb-4">Connect with me on LinkedIn for updates and professional insights.</p>
        <a 
          href="http://linkedin.com/in/arwa-alqhtani" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-200"
        >
          Visit my LinkedIn
        </a>
      </div>
    );
  }
  