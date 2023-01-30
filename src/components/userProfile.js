export const UserProfile = (
  user,
  { profileNameSelector, profileAboutSelector, profileAvatarSelector },
) => {
  const nameEl = document.querySelector(`.${profileNameSelector}`);
  const aboutEl = document.querySelector(`.${profileAboutSelector}`);
  const avatarEl = document.querySelector(`.${profileAvatarSelector}`);

  return {
    render: () => {
      const userInfo = user.getUserInfo();

      nameEl.textContent = userInfo.userName;
      aboutEl.textContent = userInfo.userAbout;
      avatarEl.src = userInfo.userAvatar;
    },
  };
};
