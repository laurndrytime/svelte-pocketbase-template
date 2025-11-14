/**Add your global states here */


type StateManager = {
	value: string | undefined;
	label: string | undefined;
	set: ({ value, label }: { value: string; label: string }) => void;
	next: () => void;
	nextValue: () => { label: string; value: string };
};


export const themeKey = 'tsg__theme';
export const themeOptions = [
	{ label: 'light', value: 'light' },
	{ value: 'dark', label: 'dark' }
];
const initialTheme = themeOptions[0];

export const theme: StateManager = $state({
	value: undefined,
	label: undefined,
	set: ({ value, label }) => {
		localStorage.setItem(themeKey, value);
		theme.value = value;
		theme.label = label;
	},
	nextValue: () => {
		if (theme.value === undefined) {
			const localStorageValue = localStorage.getItem(themeKey);
			if (localStorageValue !== null) {
				const opt = themeOptions.find((o) => o.value === localStorageValue);
				if (opt !== undefined) {
					return opt;
				} else {
					return initialTheme;
				}
			} else {
				return initialTheme;
			}
		}
		const currentThemeIndex = themeOptions.findIndex((o) => o.value === theme.value);
		if (currentThemeIndex === -1 || currentThemeIndex === themeOptions.length - 1) {
			return initialTheme;
		} else {
			return themeOptions[currentThemeIndex + 1];
		}
	},
	next: () => {
		theme.set(theme.nextValue());
	}
});
