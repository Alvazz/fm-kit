import { createPerimeter } from 'vue-kindergarten';

export default createPerimeter({
  purpose: 'base',

  can: {
    read: () => true,

    // only admin or moderator can update articles
    update(article) {
      return this.isAdmin() || (this.isCreator(article) && this.isModerator());
    },

    // if user can update articles then she can also destroy them
    destroy(article) {
      return this.isAllowed('update', article);
    }

  },

  secretNotes(article) {
    this.guard('update', article);

    return article.secretNotes;
  },

  isAdmin() {
    return this.child.role === 'admin';
  },

  isModerator() {
    return this.child.role === 'moderator';
  },

  isCreator(article) {
    return this.child.id === article.author.id;
  },

  expose: [
    'secretNotes'
  ]
});
