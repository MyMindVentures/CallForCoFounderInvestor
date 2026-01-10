import outreachRepository from '../repositories/OutreachRepository.js';

const allowedCategories = new Set(['contacts', 'websites', 'youtube']);

const normalizeDateValue = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

class OutreachService {
  async createOutreach(data) {
    if (!data?.name) {
      throw new Error('Name is required');
    }
    if (!data?.category) {
      throw new Error('Category is required');
    }
    if (!allowedCategories.has(data.category)) {
      throw new Error('Category is invalid');
    }

    const sentAt = normalizeDateValue(data.sentAt) || new Date().toISOString();

    return outreachRepository.create({
      name: data.name,
      category: data.category,
      url: data.url || null,
      contactDetails: data.contactDetails || null,
      sentMessage: data.sentMessage || null,
      sentAt,
      repliedAt: normalizeDateValue(data.repliedAt),
      replyMessage: data.replyMessage || null
    });
  }

  async getAllOutreach() {
    return outreachRepository.findAll();
  }

  async updateOutreach(id, data) {
    if (data?.category && !allowedCategories.has(data.category)) {
      throw new Error('Category is invalid');
    }

    const updatePayload = {};
    if (Object.prototype.hasOwnProperty.call(data, 'name')) {
      updatePayload.name = data.name || '';
    }
    if (Object.prototype.hasOwnProperty.call(data, 'category')) {
      updatePayload.category = data.category;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'url')) {
      updatePayload.url = data.url || null;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'contactDetails')) {
      updatePayload.contactDetails = data.contactDetails || null;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'sentMessage')) {
      updatePayload.sentMessage = data.sentMessage || null;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'sentAt')) {
      updatePayload.sentAt = normalizeDateValue(data.sentAt);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'repliedAt')) {
      updatePayload.repliedAt = normalizeDateValue(data.repliedAt);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'replyMessage')) {
      updatePayload.replyMessage = data.replyMessage || null;
    }

    return outreachRepository.update(id, updatePayload);
  }

  async deleteOutreach(id) {
    return outreachRepository.delete(id);
  }
}

export default new OutreachService();
