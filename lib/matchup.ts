// Base de données complète des matchups et synergies League of Legends
// Patch 26.05

export const MATCHUPS_DATABASE: { [championId: string]: { strongAgainst: string[], weakAgainst: string[] } } = {
  // TOP
  'aatrox': { strongAgainst: ['garen', 'darius', 'mordekaiser', 'sion'], weakAgainst: ['kale', 'quinn', 'vayne', 'fiora'] },
  'camille': { strongAgainst: ['riven', 'darius', 'fiora', 'jax'], weakAgainst: ['vladimir', 'maokai', 'lissandra'] },
  'darius': { strongAgainst: ['garen', 'malphite', 'maokai', 'sion'], weakAgainst: ['teemo', 'kled', 'quinn', 'vayne'] },
  'fiora': { strongAgainst: ['maokai', 'sion', 'malphite', 'ornn'], weakAgainst: ['darius', 'garen', 'pantheon', 'renekton'] },
  'garen': { strongAgainst: ['darius', 'mordekaiser', 'teemo', 'malphite'], weakAgainst: ['kled', 'quinn', 'kayle', 'vayne'] },
  'gnar': { strongAgainst: ['riven', 'jax', 'fiora', 'aatrox'], weakAgainst: ['vladimir', 'maokai', 'lissandra', 'ryze'] },
  'illaoi': { strongAgainst: ['maokai', 'garen', 'malphite', 'sion'], weakAgainst: ['kled', 'quinn', 'vayne', 'teemo'] },
  'jax': { strongAgainst: ['darius', 'garen', 'teemo', 'malphite'], weakAgainst: ['vayne', 'quinn', 'kayle', 'lissandra'] },
  'kled': { strongAgainst: ['garen', 'darius', 'teemo', 'malphite'], weakAgainst: ['ryze', 'vladimir', 'lissandra', 'maokai'] },
  'maokai': { strongAgainst: ['darius', 'garen', 'fiora', 'aatrox'], weakAgainst: ['ryze', 'vladimir', 'teemo', 'kayle'] },
  'mordekaiser': { strongAgainst: ['garen', 'darius', 'sion', 'malphite'], weakAgainst: ['kled', 'quinn', 'vayne', 'fiora'] },
  'ornn': { strongAgainst: ['malphite', 'sion', 'garen', 'darius'], weakAgainst: ['ryze', 'vladimir', 'kayle', 'quinn'] },
  'pantheon': { strongAgainst: ['fiora', 'vayne', 'quinn', 'riven'], weakAgainst: ['garen', 'darius', 'maokai', 'malphite'] },
  'renekton': { strongAgainst: ['teemo', 'gnar', 'vayne', 'quinn'], weakAgainst: ['garen', 'darius', 'maokai', 'malphite'] },
  'riven': { strongAgainst: ['garen', 'darius', 'malphite', 'sion'], weakAgainst: ['gnar', 'jax', 'fiora', 'maokai'] },
  'sion': { strongAgainst: ['malphite', 'garen', 'darius', 'teemo'], weakAgainst: ['fiora', 'vayne', 'quinn', 'ryze'] },
  'teemo': { strongAgainst: ['garen', 'darius', 'malphite', 'sion'], weakAgainst: ['gnar', 'jax', 'renekton', 'pantheon'] },
  'vladimir': { strongAgainst: ['darius', 'garen', 'teemo', 'malphite'], weakAgainst: ['quinn', 'vayne', 'kayle', 'ryze'] },
  
  // JUNGLE
  'amumu': { strongAgainst: ['graves', 'karthus', 'kindred', 'nidalee'], weakAgainst: ['elise', 'lee-sin', 'taliyah', 'graves'] },
  'graves': { strongAgainst: ['karthus', 'amumu', 'poppy', 'sejuani'], weakAgainst: ['elise', 'lee-sin', 'nidalee', 'taliyah'] },
  'jarvan': { strongAgainst: ['amumu', 'sejuani', 'poppy', 'skarner'], weakAgainst: ['lee-sin', 'graves', 'elise', 'nidalee'] },
  'lee-sin': { strongAgainst: ['graves', 'karthus', 'kindred', 'amumu'], weakAgainst: ['elise', 'nidalee', 'taliyah', 'poppy'] },
  'nidalee': { strongAgainst: ['graves', 'karthus', 'amumu', 'poppy'], weakAgainst: ['lee-sin', 'elise', 'sejuani', 'jarvan'] },
  'sejuani': { strongAgainst: ['graves', 'karthus', 'amumu', 'poppy'], weakAgainst: ['lee-sin', 'nidalee', 'elise', 'graves'] },
  'taliyah': { strongAgainst: ['graves', 'kindred', 'poppy', 'amumu'], weakAgainst: ['lee-sin', 'nidalee', 'elise', 'jarvan'] },
  
  // MID
  'ahri': { strongAgainst: ['annie', 'ryze', 'talon', 'zed'], weakAgainst: ['katarina', 'fizz', 'yasuo', 'zoe'] },
  'akali': { strongAgainst: ['yasuo', 'irelia', 'zed', 'talon'], weakAgainst: ['galio', 'kassadin', 'ahri', 'lux'] },
  'annie': { strongAgainst: ['kassadin', 'ryze', 'talon', 'zed'], weakAgainst: ['ahri', 'fizz', 'yasuo', 'zoe'] },
  'cassiopeia': { strongAgainst: ['yasuo', 'zed', 'talon', 'irelia'], weakAgainst: ['kassadin', 'fizz', 'ahri', 'ryze'] },
  'fizz': { strongAgainst: ['ahri', 'annie', 'lux', 'ryze'], weakAgainst: ['yasuo', 'zed', 'talon', 'kassadin'] },
  'galio': { strongAgainst: ['katarina', 'yasuo', 'irelia', 'zed'], weakAgainst: ['kassadin', 'fizz', 'ahri', 'ryze'] },
  'katarina': { strongAgainst: ['yasuo', 'irelia', 'zed', 'talon'], weakAgainst: ['galio', 'kassadin', 'ahri', 'lux'] },
  'kassadin': { strongAgainst: ['annie', 'ryze', 'lux', 'ahri'], weakAgainst: ['yasuo', 'zed', 'talon', 'irelia'] },
  'lux': { strongAgainst: ['talon', 'zed', 'yasuo', 'katarina'], weakAgainst: ['kassadin', 'fizz', 'ahri', 'ryze'] },
  'ryze': { strongAgainst: ['zed', 'talon', 'yasuo', 'irelia'], weakAgainst: ['ahri', 'fizz', 'kassadin', 'lux'] },
  'talon': { strongAgainst: ['kassadin', 'ryze', 'lux', 'ahri'], weakAgainst: ['galio', 'yasuo', 'zed', 'irelia'] },
  'twisted-fate': { strongAgainst: ['syndra', 'ahri', 'zed', 'talon'], weakAgainst: ['kassadin', 'fizz', 'yasuo', 'zoe'] },
  'yasuo': { strongAgainst: ['galio', 'zed', 'talon', 'kassadin'], weakAgainst: ['ahri', 'lux', 'annie', 'ryze'] },
  'zed': { strongAgainst: ['kassadin', 'ryze', 'lux', 'ahri'], weakAgainst: ['galio', 'yasuo', 'talon', 'fizz'] },
  'zoe': { strongAgainst: ['ahri', 'annie', 'lux', 'ryze'], weakAgainst: ['kassadin', 'yasuo', 'zed', 'talon'] },
  
  // ADC
  'ashe': { strongAgainst: ['kalista', 'draven', 'samira', 'jhin'], weakAgainst: ['zeri', 'kaisa', 'varus', 'caitlyn'] },
  'caitlyn': { strongAgainst: ['ashe', 'mf', 'varus', 'jhin'], weakAgainst: ['akali', 'zyra', 'karma', 'lux'] },
  'draven': { strongAgainst: ['ashe', 'varus', 'jhin', 'kalista'], weakAgainst: ['thresh', 'blitzcrank', 'leona', 'nautilus'] },
  'jhin': { strongAgainst: ['ashe', 'caitlyn', 'varus', 'mf'], weakAgainst: ['zeri', 'kaisa', 'thresh', 'leona'] },
  'kaisa': { strongAgainst: ['ashe', 'caitlyn', 'varus', 'jhin'], weakAgainst: ['blitzcrank', 'thresh', 'leona', 'nautilus'] },
  'kalista': { strongAgainst: ['ashe', 'varus', 'jhin', 'caitlyn'], weakAgainst: ['thresh', 'blitzcrank', 'leona', 'braum'] },
  'mf': { strongAgainst: ['ashe', 'caitlyn', 'jhin', 'varus'], weakAgainst: ['zeri', 'kaisa', 'thresh', 'leona'] },
  'samira': { strongAgainst: ['caitlyn', 'varus', 'jhin', 'ashe'], weakAgainst: ['thresh', 'blitzcrank', 'leona', 'nautilus'] },
  'vayne': { strongAgainst: ['garen', 'maokai', 'darius', 'ornn'], weakAgainst: ['blitzcrank', 'thresh', 'leona', 'nautilus'] },
  'varus': { strongAgainst: ['ashe', 'caitlyn', 'jhin', 'mf'], weakAgainst: ['zeri', 'kaisa', 'thresh', 'leona'] },
  'zeri': { strongAgainst: ['ashe', 'caitlyn', 'varus', 'jhin'], weakAgainst: ['braum', 'thresh', 'leona', 'nautilus'] },
  
  // SUPPORT
  'alistar': { strongAgainst: ['blitzcrank', 'thresh', 'leona', 'nautilus'], weakAgainst: ['zyra', 'karma', 'lux', 'brand'] },
  'blitzcrank': { strongAgainst: ['senna', 'lulu', 'janna', 'bard'], weakAgainst: ['karma', 'leona', 'thresh', 'nautilus'] },
  'braum': { strongAgainst: ['pyke', 'lux', 'brand', 'zyra'], weakAgainst: ['alistar', 'nautilus', 'zyra', 'karma'] },
  'janna': { strongAgainst: ['blitzcrank', 'alistar', 'leona', 'nautilus'], weakAgainst: ['zyra', 'brand', 'karma', 'lux'] },
  'karma': { strongAgainst: ['blitzcrank', 'alistar', 'thresh', 'leona'], weakAgainst: ['zyra', 'lux', 'brand', 'bard'] },
  'leona': { strongAgainst: ['blitzcrank', 'pyke', 'thresh', 'senna'], weakAgainst: ['bard', 'karma', 'vel-koz', 'lux'] },
  'lulu': { strongAgainst: ['blitzcrank', 'alistar', 'leona', 'nautilus'], weakAgainst: ['zyra', 'brand', 'karma', 'lux'] },
  'lux': { strongAgainst: ['talon', 'zed', 'yasuo', 'blitzcrank'], weakAgainst: ['kassadin', 'fizz', 'ahri', 'ryze'] },
  'nautilus': { strongAgainst: ['blitzcrank', 'pyke', 'thresh', 'senna'], weakAgainst: ['karma', 'lux', 'brand', 'bard'] },
  'pyke': { strongAgainst: ['thresh', 'blitzcrank', 'alistar', 'leona'], weakAgainst: ['bard', 'karma', 'lux', 'brand'] },
  'senna': { strongAgainst: ['blitzcrank', 'alistar', 'leona', 'nautilus'], weakAgainst: ['zyra', 'brand', 'karma', 'lux'] },
  'thresh': { strongAgainst: ['leona', 'blitzcrank', 'senna', 'nautilus'], weakAgainst: ['pyke', 'bard', 'karma', 'lux'] },
  'zyra': { strongAgainst: ['blitzcrank', 'alistar', 'leona', 'nautilus'], weakAgainst: ['karma', 'lux', 'brand', 'bard'] },
}

export const SYNERGIES_DATABASE: { [championId: string]: { good: string[], bad: string[] } } = {
  // Synergies: Champions qui vont bien ensemble
  'garen': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['vayne', 'fiora', 'kled'] },
  'darius': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['vayne', 'quinn', 'fiora'] },
  'amumu': { good: ['katarina', 'ahri', 'darius', 'garen', 'jarvan'], bad: ['warwick', 'graves'] },
  'katarina': { good: ['amumu', 'galio', 'malphite', 'jarvan', 'leona'], bad: ['twisted-fate', 'ryze'] },
  'ahri': { good: ['leona', 'nautilus', 'alistar', 'thresh', 'braum'], bad: ['katarina', 'yasuo'] },
  'vayne': { good: ['braum', 'karma', 'lulu', 'janna', 'bard'], bad: ['leona', 'blitzcrank', 'nautilus'] },
  'caitlyn': { good: ['leona', 'nautilus', 'braum', 'thresh', 'alistar'], bad: ['zyra', 'karma'] },
  'ashe': { good: ['leona', 'braum', 'thresh', 'nautilus', 'alistar'], bad: ['zeri', 'kaisa'] },
  'leona': { good: ['vayne', 'caitlyn', 'ashe', 'jhin', 'draven'], bad: ['bard', 'karma', 'lux'] },
  'thresh': { good: ['draven', 'samira', 'kalista', 'jhin', 'caitlyn'], bad: ['leona', 'nautilus'] },
  'braum': { good: ['vayne', 'ashe', 'caitlyn', 'jhin', 'kalista'], bad: ['alistar', 'nautilus'] },
  'blitzcrank': { good: ['mf', 'jhin', 'draven', 'samira', 'kalista'], bad: ['leona', 'thresh'] },
}
