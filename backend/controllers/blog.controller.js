const db = require('../config/db');
const Blog = db.blogPosts;

exports.create = async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    res.status(201).json({ message: 'Blog post created', data: post });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { excerpt: { $regex: search, $options: 'i' } }];
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)), Blog.countDocuments(query)]);
    res.json({ data, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Blog.findOneAndUpdate(
      { $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }], isPublished: true },
      { $inc: { views: 1 } }, { new: true }
    );
    if (!data) return res.status(404).json({ message: 'Post not found' });
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const data = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Updated', data });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
