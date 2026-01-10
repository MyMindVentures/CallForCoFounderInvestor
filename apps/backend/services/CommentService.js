import commentRepository from '../repositories/CommentRepository.js';

const normalizeLanguage = (language) => (language ? language.toLowerCase() : null);

class CommentService {
  async createComment(data) {
    if (!data.name || !data.comment) {
      throw new Error('Name and comment are required');
    }

    return await commentRepository.create({
      name: data.name,
      comment: data.comment,
      language: normalizeLanguage(data.language),
      isPositive: true,
      isPublished: true
    });
  }

  async getAllComments() {
    return await commentRepository.findAll();
  }

  async getPublicComments(language) {
    return await commentRepository.findPublic(normalizeLanguage(language));
  }

  async curateComment(id, curationData) {
    const comment = await commentRepository.findById(id);
    if (!comment) {
      throw new Error('Comment not found');
    }

    return await commentRepository.update(id, {
      isPositive: curationData.isPositive,
      isPublished: curationData.isPublished
    });
  }
}

export default new CommentService();
