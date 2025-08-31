from django.shortcuts import render

# Create your views here.
def blogs(request):
    return render(request, 'blogs/blogs.html')

def blog_detail(request, slug):
    blogs_data = {
        'mastering-chatgpt-blog': {
            'title': "Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS Marketing Managers",
            'header_image': 'img/blogs/chatgpt-header.jpg',
            'date': 'Oct 19',
            'author': 'Ahmed',
            'section_title': 'Exploring Generative AI in Content Creation',
            'content': """
                Hello there! As a marketing manager in the SaaS industry, you might be looking for
                            innovative
                            ways to engage your audience. I bet generative AI has crossed your mind as an option for
                            creating content. Well, let me share from my firsthand experience.
                            <br><br>
                            Google encourages high-quality blogs regardless of whether they're <span
                                style="color: #91CC1F;">written by humans or created
                                using artificial intelligence</span> like ChatGPT. Here's what matters: producing
                            original
                            material
                            with expertise and trustworthiness based on Google <span style="color: #91CC1F;">E-E-A-T
                                principles</span>.
                            <br><br>
                            This means focusing more on people-first writing rather than primarily employing AI tools to
                            manipulate search rankings. There comes a time when many experienced professionals want to
                            communicate their insights but get stuck due to limited writing skills – that’s where
                            Generative
                            AI can step in.
                            <br><br>
                            So, together, we’re going explore how this technology could help us deliver valuable content
                            without sounding robotic or defaulting into mere regurgitations of existing materials
                            (spoiler
                            alert – common pitfalls!). Hang tight - it’ll be a fun learning journey!
                            <br><br>
                            Jumping headfirst into using AI, like ChatGPT, without a content strategy can lead to some
                            unfortunate results. One common pitfall I've seen is people opting for quantity over quality
                            -
                            they churn out blogs, but each one feels robotic and soulless.
            """,
            'outline': [
                'Exploring Generative AI in Content Creation',
                'Steering Clear of Common AI Writing Pitfalls',
                'Understanding ChatGPT Capabilities - Define Your Style',
                'Understand Your Readers',
                'Creating Quality AI-powered Blogs that Stand Out',
                'Conclusion: Embracing AI in Blog Creation',
                'Afterword: The AI Behind This Article'
            ]
        }
    }

    blog = blogs_data.get(slug)
    if not blog:
        return render(request, '404.html', status=404)

    return render(request, 'blogs/blog_detail.html', {
        'blog_title': blog['title'],
        'blog_header_image': blog['header_image'],
        'blog_date': blog['date'],
        'blog_author': blog['author'],
        'section_title': blog['section_title'],
        'blog_content': blog['content'],
        'article_outline': blog['outline']
    })
