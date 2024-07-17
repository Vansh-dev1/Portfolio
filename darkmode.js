document.addEventListener("DOMContentLoaded", () => {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	  document.documentElement.classList.remove('light-theme');
	  document.documentElement.classList.add('dark-theme');
	} else {
	  document.documentElement.classList.remove('dark-theme');
	  document.documentElement.classList.add('light-theme');
	}	
});
