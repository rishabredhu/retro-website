// import {
//     algorithms,
//     devnotes,
//     oscs,
//   } from "./assets";
  
  export const navLinks = [
    {
      id: "hero",
      title: "Hero",
    },
    {
      id: "portfolio",
      title: "Portfolio",
    },
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  // 
  const portfolio = [
    {
      name: "AI Hawk",
      description:
        "A GitHub project with over 11,000 stars, featuring an advanced AI Agent system for job automation. Contributed to LLM, LangChain, Python, CLI, and Automation components to enhance system capability and user experience, significantly increasing operational efficiency.",
      technologies: ["LLM", "LangChain", "Python", "CLI", "Automation"],
      link: "https://github.com/your-username/ai-hawk", // Add a link if available
      // image: aiHawk, // Uncomment when image import is set up
    },
    {
      name: "Guard Vision",
      description:
        "A real-time face detection application with 12+ users, leveraging Python, PyTorch, Milvus, and AWS. Developed the front-end with HTML5, CSS, and JS, while fine-tuning a PyTorch-based similarity search model. Integrated various AWS services for scalable deployment and real-time data processing, improving face detection accuracy by 12%.",
      technologies: ["Python", "PyTorch", "Milvus", "AWS", "HTML5", "CSS", "JavaScript"],
      link: "https://guardvision-demo.yourdomain.com", // Add a link if available
      // image: guardVision, // Uncomment when image import is set up
    },
    {
      name: "Precision Agriculture",
      description:
        "An innovative agricultural solution with 90+ users, utilizing Python, Go, R, and Machine Learning. Implemented a WebRPC service in Go for real-time sensor data transmission, improving crop yield by 15% and reducing water usage by 20%. Developed predictive models and statistical analysis in R, achieving 20% resource optimization for irrigation and fertilization schedules.",
      technologies: ["Python", "Go", "R", "Machine Learning", "WebRPC", "Statistical Analysis"],
      link: "https://precision-ag.yourdomain.com", // Add a link if available
      // image: precisionAg, // Uncomment when image import is set up
    },
  ];
  
  const experiences = 
  [
    {
      title: "Summer Fellow",
      company_name: "HeadStarter AI",
      location: "New York, NY",
      date: "Aug. 2024 – Present",
      details: [
        "Building MVP with a team of 4, driving initial product validation and feature iterations based on user feedback."
      ]
    },
    {
      title: "AI Engineer Intern",
      company_name: "Social Group Lab, Radical AI",
      location: "New York, NY",
      date: "Jan. 2024 – Present",
      details: [
        "Developed and executed automated test cases using Python and Selenium for LLM-based products, reducing manual testing efforts by 30%.",
        "Set up a benchmarking framework to evaluate AI model performance, improving model selection by 20%.",
        "Enhanced user engagement by 25% through the integration of a code editor using React and Redux.",
        "Worked closely with the data engineering team to optimize ETL pipelines, ensuring clean and normalized data for AI models."
      ]
    },
    {
      title: "Graduate Technical Intern",
      company_name: "Intel Corporation",
      location: "Folsom, California",
      date: "Jan. 2023 – May 2023",
      details: [
        "Engineered a high-throughput pipeline using Apache Kafka and Spark, processing over 5,000 records per second for real-time iGPU performance analysis.",
        "Developed an interactive dashboard with React and Flask, enabling sub-second query response times for key performance metrics visualization.",
        "Diagnosed and resolved GPU performance issues by correlating performance drops with temperature spikes, optimizing overall efficiency.",
        "Contributed to agile teams, focusing on daily stand-ups, sprint reviews, and collaborative troubleshooting."
      ]
    },
    {
      title: "Research Assistant/Data Engineer",
      company_name: "Center of Urban Science and Progress, NYU",
      location: "New York, NY",
      date: "May 2022 – Dec. 2022",
      details: [
        "Developed scalable ETL pipelines on GCP using Dataflow and BigQuery, enabling efficient data processing and analysis.",
        "Created interactive dashboards using Looker and Python, supporting data-driven decision-making.",
        "Automated data pipelines using Airflow and Docker, applying NLP libraries for sentiment analysis and topic modeling.",
        "Created and managed APIs for accessing and interacting with data solutions, facilitating integration and real-time data access."
      ]
    }
  ];
  
  export { experiences, portfolio };