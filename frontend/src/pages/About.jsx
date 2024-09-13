// src/pages/About.js
import React, { useEffect } from 'react';
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className=" bg-gray-100 py-12">
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
          <p className="text-gray-700 leading-relaxed">
              We use the collected information for various purposes, including:
              To personalize your experience: We may use your information to display content relevant to your interests.
              To improve our website: We continually strive to improve our website and offerings based on the feedback and analytics we gather.
              To communicate with you: We may use your contact details to respond to your inquiries, send you newsletters, and provide updates.
              To enforce legal obligations: If required by law, we may disclose your information to comply with legal processes.
              <br />
              3. Cookies and Tracking Technologies
              We use cookies and similar tracking technologies (such as web beacons and pixels) to enhance your experience.
               Cookies are small text files that are placed on your device when you visit a website. You can control the use of cookies through your browser settings.
              <br />
              Some cookies we use include:
              <br />
              Essential Cookies: These are necessary for the website to function properly.
              Analytics Cookies: These help us understand how users interact with our website.
              <br />
              4. Sharing of Your Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
