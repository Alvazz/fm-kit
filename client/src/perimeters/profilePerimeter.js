import { createPerimeter } from 'vue-kindergarten';

export default createPerimeter({
  purpose: 'profile',

  can: {
    read: () => true,

    update(user) {
      return this.isAdmin() || (this.isOwn(user) && this.isModerator())
    },
    destroy(user) {
      return this.isAllowed('own', user)
    },
    own(user) {
      return this.isAdmin() || this.isOwn(user)
    },
    isAdmin() {
      return this.isAdmin()
    },
    isLogged() {
      return this.child
    }
  },

  secretNotes(user) {
    this.guard('update', user.id)
    return user.secretNotes
  },

  isAdmin() {
    return this.child && this.child.role === 'admin'
  },

  isModerator() {
    return this.child && this.child.role === 'moderator'
  },

  isOwn(user) {
    console.log(this.child && this.child.id === user.id)
    return this.child && this.child.userId === user.id
  },

  expose: [
    'secretNotes'
  ]
});
