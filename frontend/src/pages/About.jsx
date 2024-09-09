// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About BlogPost</h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-gray-900">BlogPost</span> – a platform where people from around the world can come together to share their thoughts, experiences, and stories. 
            Whether you are an aspiring writer, a professional blogger, or someone who simply loves to read, BlogPost provides the perfect space for you to create and consume amazing content.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            On BlogPost, anyone can <span className="font-semibold text-gray-900">create blogs</span> on topics they are passionate about, express their creativity, and share knowledge with the community. From tech to travel, food to fashion – there’s room for every idea.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Don’t just stop at writing! <span className="font-semibold text-gray-900">Read</span> blogs by other writers, interact with the community through comments, and follow your favorite authors. At BlogPost, we believe in the power of words to connect people and build communities.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We invite you to join us, whether as a reader, writer, or both, and be a part of this dynamic blogging platform. Create, share, and inspire with BlogPost!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
