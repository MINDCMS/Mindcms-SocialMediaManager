import { useState } from "react";
import axios from "axios";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-blog/", {
        topic,
        category,
      });
      setGeneratedBlog(response.data.blog);
    } catch (error) {
      console.error("Error generating blog:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Blog Generator</h1>
      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleGenerateBlog}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>
      {generatedBlog && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Generated Blog:</h2>
          <p>{generatedBlog}</p>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
