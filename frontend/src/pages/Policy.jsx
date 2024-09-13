import React, { useEffect } from 'react'

const Policy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Privacy Section */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-gray-900">BlogPost</span> – Content copying is not allowed in this website , doing so 
            is a punishable offence and could result in legal cases.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
          We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines
           how we collect, use, disclose, and safeguard your information when you visit our website, [Website URL], or interact with us.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
          By accessing or using our website, you agree to this Privacy Policy. If you do not agree with the terms of this policy, please do not use our website.
<br />
1. Information We Collect <br />
We may collect the following types of information when you visit our website:
<br />
1.1 Personal Information
<br />
When you register for an account, subscribe to our newsletter, comment on posts, or contact us, we may collect personal information such as:
Your name
Email address
Username
Any other information you voluntarily provide 
<br />
1.2 Non-Personal Information
<br />
We automatically collect certain information about your device and usage patterns when you visit our website, including:
IP address
Browser type
Device information (such as operating system)
Pages visited, time spent on the website, and other browsing statistics
Cookies and similar technologies
          </p>

          <p className="text-gray-700 leading-relaxed">
            We invite you to join us, whether as a reader, writer, or both, and be a part of this dynamic blogging platform. Create, share, and inspire with BlogPost!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Policy