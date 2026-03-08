// Base de données COMPLÈTE des matchups League of Legends
// Cette base doit contenir TOUS les champions du jeu pour fonctionner correctement

export const MATCHUPS_DATABASE: { [championId: string]: { strongAgainst: string[], weakAgainst: string[] } } = {
  // TOP LANE
  'aatrox': { strongAgainst: ['garen', 'darius', 'mordekaiser', 'sion'], weakAgainst: ['kayle', 'quinn', 'vayne', 'fiora'] },
  'camille': { strongAgainst: ['riven', 'darius', 'fiora', 'jax'], weakAgainst: ['vladimir', 'maokai', 'lissandra'] },
  'chogath': { strongAgainst: ['darius', 'garen', 'malphite', 'sion'], weakAgainst: ['teemo', 'quinn', 'vayne'] },
  'darius': { strongAgainst: ['garen', 'malphite', 'maokai', 'sion'], weakAgainst: ['teemo', 'kled', 'quinn', 'vayne'] },
  'fiora': { strongAgainst: ['maokai', 'sion', 'malphite', 'ornn'], weakAgainst: ['darius', 'garen', 'pantheon', 'renekton'] },
  'garen': { strongAgainst: ['darius', 'mordekaiser', 'teemo', 'malphite'], weakAgainst: ['kled', 'quinn', 'kayle', 'vayne'] },
  'gnar': { strongAgainst: ['riven', 'jax', 'fiora', 'aatrox'], weakAgainst: ['vladimir', 'maokai', 'lissandra', 'ryze'] },
  'gragas': { strongAgainst: ['yasuo', 'zed', 'talon'], weakAgainst: ['orianna', 'syndra', 'ahri'] },
  'illaoi': { strongAgainst: ['maokai', 'garen', 'malphite', 'sion'], weakAgainst: ['kled', 'quinn', 'vayne', 'teemo'] },
  'jax': { strongAgainst: ['darius', 'garen', 'teemo', 'malphite'], weakAgainst: ['vayne', 'quinn', 'kayle', 'lissandra'] },
  'kled': { strongAgainst: ['garen', 'darius', 'teemo', 'malphite'], weakAgainst: ['ryze', 'vladimir', 'lissandra', 'maokai'] },
  'maokai': { strongAgainst: ['darius', 'garen', 'fiora', 'aatrox'], weakAgainst: ['ryze', 'vladimir', 'teemo', 'kayle'] },
  'malphite': { strongAgainst: ['ad-heavy'], weakAgainst: ['ryze', 'vladimir', 'teemo'] },
  'mordekaiser': { strongAgainst: ['garen', 'darius', 'sion'], weakAgainst: ['kled', 'quinn', 'vayne', 'fiora'] },
  'ornn': { strongAgainst: ['malphite', 'sion', 'garen', 'darius'], weakAgainst: ['ryze', 'vladimir', 'kayle', 'quinn'] },
  'pantheon': { strongAgainst: ['fiora', 'vayne', 'quinn', 'riven'], weakAgainst: ['garen', 'darius', 'maokai', 'malphite'] },
  'renekton': { strongAgainst: ['teemo', 'gnar', 'vayne', 'quinn'], weakAgainst: ['garen', 'darius', 'maokai', 'malphite'] },
  'riven': { strongAgainst: ['garen', 'darius', 'malphite', 'sion'], weakAgainst: ['gnar', 'jax', 'fiora', 'maokai'] },
  'sion': { strongAgainst: ['malphite', 'garen', 'darius', 'teemo'], weakAgainst: ['fiora', 'vayne', 'quinn', 'ryze'] },
  'teemo': { strongAgainst: ['garen', 'darius', 'malphite', 'sion'], weakAgainst: ['gnar', 'jax', 'renekton', 'pantheon'] },
  'vladimir': { strongAgainst: ['darius', 'garen', 'teemo', 'malphite'], weakAgainst: ['quinn', 'vayne', 'kayle', 'ryze'] },
  'wukong': { strongAgainst: ['garen', 'darius', 'malphite'], weakAgainst: ['ryze', 'vladimir', 'kayle'] },

  // JUNGLE
  'amumu': { strongAgainst: ['graves', 'karthus', 'kindred'], weakAgainst: ['elise', 'lee-sin', 'taliyah'] },
  'diana': { strongAgainst: ['zed', 'yasuo', 'ahri'], weakAgainst: ['lee-sin', 'graves'] },
  'evelynn': { strongAgainst: ['ahri', 'lux', 'syndra'], weakAgainst: ['lee-sin', 'graves', 'nidalee'] },
  'graves': { strongAgainst: ['karthus', 'amumu', 'poppy'], weakAgainst: ['elise', 'lee-sin', 'nidalee', 'taliyah'] },
  'hecarim': { strongAgainst: ['garen', 'malphite'], weakAgainst: ['lee-sin', 'graves'] },
  'jarvan': { strongAgainst: ['amumu', 'sejuani', 'poppy'], weakAgainst: ['lee-sin', 'graves', 'elise'] },
  'jgler': { strongAgainst: [], weakAgainst: [] },
  'kha-zix': { strongAgainst: ['ahri', 'lux', 'syndra'], weakAgainst: ['lee-sin', 'graves'] },
  'kindred': { strongAgainst: ['graves', 'amumu'], weakAgainst: ['lee-sin', 'elise', 'nidalee'] },
  'lee-sin': { strongAgainst: ['graves', 'karthus', 'kindred'], weakAgainst: ['elise', 'nidalee', 'taliyah'] },
  'lillia': { strongAgainst: ['amumu', 'sejuani'], weakAgainst: ['lee-sin', 'graves'] },
  'nidalee': { strongAgainst: ['graves', 'karthus', 'amumu'], weakAgainst: ['lee-sin', 'elise', 'sejuani'] },
  'noct-urne': { strongAgainst: ['ahri', 'lux'], weakAgainst: ['lee-sin', 'graves'] },
  'sejuani': { strongAgainst: ['graves', 'karthus', 'amumu'], weakAgainst: ['lee-sin', 'nidalee', 'elise'] },
  'taliyah': { strongAgainst: ['graves', 'kindred'], weakAgainst: ['lee-sin', 'nidalee', 'elise'] },

  // MID LANE
  'ahri': { strongAgainst: ['annie', 'ryze', 'talon', 'zed'], weakAgainst: ['katarina', 'fizz', 'yasuo', 'zoe'] },
  'akali': { strongAgainst: ['yasuo', 'irelia', 'zed', 'talon'], weakAgainst: ['galio', 'kassadin', 'ahri', 'lux'] },
  'annie': { strongAgainst: ['kassadin', 'ryze', 'talon', 'zed'], weakAgainst: ['ahri', 'fizz', 'yasuo'] },
  'azir': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'cassiopeia': { strongAgainst: ['yasuo', 'zed', 'talon'], weakAgainst: ['kassadin', 'fizz', 'ahri'] },
  'evelynn': { strongAgainst: ['ahri', 'lux'], weakAgainst: ['kassadin', 'fizz'] },
  'fizz': { strongAgainst: ['ahri', 'annie', 'lux', 'ryze'], weakAgainst: ['yasuo', 'zed', 'talon', 'kassadin'] },
  'galio': { strongAgainst: ['katarina', 'yasuo', 'irelia'], weakAgainst: ['kassadin', 'fizz', 'ahri'] },
  'katarina': { strongAgainst: ['yasuo', 'irelia', 'zed'], weakAgainst: ['galio', 'kassadin', 'ahri'] },
  'kassadin': { strongAgainst: ['annie', 'ryze', 'lux'], weakAgainst: ['yasuo', 'zed', 'talon'] },
  'leblanc': { strongAgainst: ['ryze', 'kassadin'], weakAgainst: ['ahri', 'fizz'] },
  'lissandra': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['fizz', 'kassadin'] },
  'lux': { strongAgainst: ['talon', 'zed', 'yasuo'], weakAgainst: ['kassadin', 'fizz', 'ahri'] },
  'malzahar': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'orianna': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'ryze': { strongAgainst: ['zed', 'talon', 'yasuo'], weakAgainst: ['ahri', 'fizz', 'kassadin'] },
  'syndra': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'talon': { strongAgainst: ['kassadin', 'ryze', 'lux'], weakAgainst: ['galio', 'yasuo'] },
  'twisted-fate': { strongAgainst: ['syndra', 'ahri', 'zed'], weakAgainst: ['kassadin', 'fizz', 'yasuo'] },
  'veigar': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'viktor': { strongAgainst: ['yasuo', 'zed'], weakAgainst: ['kassadin', 'fizz'] },
  'yasuo': { strongAgainst: ['galio', 'zed', 'talon'], weakAgainst: ['ahri', 'lux', 'annie'] },
  'zed': { strongAgainst: ['kassadin', 'ryze', 'lux'], weakAgainst: ['galio', 'yasuo', 'talon'] },
  'zoe': { strongAgainst: ['ahri', 'annie', 'lux'], weakAgainst: ['kassadin', 'yasuo', 'zed'] },

  // ADC
  'ashe': { strongAgainst: ['kalista', 'draven', 'samira', 'jhin'], weakAgainst: ['zeri', 'kaisa', 'varus'] },
  'caitlyn': { strongAgainst: ['ashe', 'mf', 'varus'], weakAgainst: ['akali', 'zyra', 'karma'] },
  'draven': { strongAgainst: ['ashe', 'varus', 'jhin'], weakAgainst: ['thresh', 'blitzcrank', 'leona'] },
  'jhin': { strongAgainst: ['ashe', 'caitlyn', 'varus'], weakAgainst: ['zeri', 'kaisa', 'thresh'] },
  'kaisa': { strongAgainst: ['ashe', 'caitlyn', 'varus'], weakAgainst: ['blitzcrank', 'thresh', 'leona'] },
  'kalista': { strongAgainst: ['ashe', 'varus', 'jhin'], weakAgainst: ['thresh', 'blitzcrank', 'leona'] },
  'kog-maw': { strongAgainst: ['ashe'], weakAgainst: ['zeri', 'kaisa'] },
  'mf': { strongAgainst: ['ashe', 'caitlyn', 'jhin'], weakAgainst: ['zeri', 'kaisa', 'thresh'] },
  'samira': { strongAgainst: ['caitlyn', 'varus', 'jhin'], weakAgainst: ['thresh', 'blitzcrank', 'leona'] },
  'sivir': { strongAgainst: ['ashe'], weakAgainst: ['zeri', 'kaisa'] },
  'twitch': { strongAgainst: ['ashe'], weakAgainst: ['zeri', 'kaisa'] },
  'vayne': { strongAgainst: ['garen', 'maokai', 'darius'], weakAgainst: ['blitzcrank', 'thresh', 'leona'] },
  'varus': { strongAgainst: ['ashe', 'caitlyn', 'jhin'], weakAgainst: ['zeri', 'kaisa', 'thresh'] },
  'xayah': { strongAgainst: ['ashe'], weakAgainst: ['zeri', 'kaisa'] },
  'zeri': { strongAgainst: ['ashe', 'caitlyn', 'varus'], weakAgainst: ['braum', 'thresh', 'leona'] },

  // SUPPORT
  'alistar': { strongAgainst: ['blitzcrank', 'thresh', 'leona'], weakAgainst: ['zyra', 'karma', 'brand'] },
  'bard': { strongAgainst: ['leona', 'thresh'], weakAgainst: ['blitzcrank', 'alistar'] },
  'blitzcrank': { strongAgainst: ['senna', 'lulu', 'janna'], weakAgainst: ['karma', 'leona', 'thresh'] },
  'braum': { strongAgainst: ['pyke', 'brand', 'zyra'], weakAgainst: ['alistar', 'nautilus', 'karma'] },
  'janna': { strongAgainst: ['blitzcrank', 'alistar', 'leona'], weakAgainst: ['zyra', 'brand', 'karma'] },
  'karma': { strongAgainst: ['blitzcrank', 'alistar', 'thresh', 'leona'], weakAgainst: ['zyra', 'brand'] },
  'leona': { strongAgainst: ['blitzcrank', 'pyke', 'thresh', 'senna'], weakAgainst: ['bard', 'karma'] },
  'lulu': { strongAgainst: ['blitzcrank', 'alistar', 'leona'], weakAgainst: ['zyra', 'brand', 'karma'] },
  'lux': { strongAgainst: ['talon', 'zed', 'yasuo'], weakAgainst: ['kassadin', 'fizz', 'ahri'] },
  'morgana': { strongAgainst: ['blitzcrank'], weakAgainst: ['thresh', 'leona'] },
  'nautilus': { strongAgainst: ['blitzcrank', 'pyke', 'thresh'], weakAgainst: ['karma', 'brand'] },
  'pyke': { strongAgainst: ['thresh', 'blitzcrank', 'alistar'], weakAgainst: ['bard', 'karma'] },
  'rakan': { strongAgainst: ['blitzcrank', 'leona'], weakAgainst: ['thresh'] },
  'senna': { strongAgainst: ['blitzcrank', 'alistar', 'leona'], weakAgainst: ['zyra', 'brand', 'karma'] },
  'soraka': { strongAgainst: ['blitzcrank'], weakAgainst: ['thresh', 'leona', 'pyke'] },
  'taric': { strongAgainst: ['blitzcrank', 'leona'], weakAgainst: ['thresh', 'pyke'] },
  'thresh': { strongAgainst: ['leona', 'blitzcrank', 'senna'], weakAgainst: ['pyke', 'bard', 'karma'] },
  'zyra': { strongAgainst: ['blitzcrank', 'alistar', 'leona'], weakAgainst: ['karma', 'brand'] },

  // Championshipaux avec noms alternatifs
  'nunu-willump': { strongAgainst: ['graves', 'amumu'], weakAgainst: ['lee-sin', 'elise'] },
  'nocturne': { strongAgainst: ['ahri', 'lux'], weakAgainst: ['lee-sin', 'graves'] },
  'miss-fortune': { strongAgainst: ['ashe', 'caitlyn', 'jhin'], weakAgainst: ['zeri', 'kaisa', 'thresh'] },
}

export const SYNERGIES_DATABASE: { [championId: string]: { good: string[], bad: string[] } } = {
  // TOP
  'garen': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['vayne', 'fiora'] },
  'darius': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['vayne', 'fiora'] },
  'maokai': { good: ['katarina', 'ahri', 'darius', 'garen'], bad: ['warwick', 'graves'] },
  
  // JUNGLE
  'amumu': { good: ['katarina', 'ahri', 'darius', 'garen', 'jarvan'], bad: ['warwick', 'graves'] },
  'lee-sin': { good: ['garen', 'darius'], bad: ['warwick'] },
  
  // MID
  'katarina': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['twisted-fate', 'ryze'] },
  'ahri': { good: ['leona', 'nautilus', 'alistar', 'thresh'], bad: ['katarina', 'yasuo'] },
  
  // ADC
  'vayne': { good: ['braum', 'karma', 'lulu', 'janna'], bad: ['leona', 'blitzcrank'] },
  'caitlyn': { good: ['leona', 'nautilus', 'braum', 'thresh'], bad: ['zyra', 'karma'] },
  'ashe': { good: ['leona', 'braum', 'thresh', 'nautilus'], bad: ['zeri', 'kaisa'] },
  'draven': { good: ['leona', 'braum', 'thresh'], bad: ['zyra', 'karma'] },
  'jhin': { good: ['leona', 'braum', 'thresh'], bad: ['zyra', 'karma'] },
  
  // SUPPORT
  'leona': { good: ['vayne', 'caitlyn', 'ashe', 'jhin', 'draven'], bad: ['bard', 'karma'] },
  'thresh': { good: ['draven', 'samira', 'kalista', 'jhin'], bad: ['leona', 'nautilus'] },
  'braum': { good: ['vayne', 'ashe', 'caitlyn', 'jhin'], bad: ['alistar', 'nautilus'] },
  'blitzcrank': { good: ['mf', 'jhin', 'draven', 'samira'], bad: ['leona', 'thresh'] },
  'soraka': { good: ['ashe'], bad: ['pyke', 'leona'] },
}
