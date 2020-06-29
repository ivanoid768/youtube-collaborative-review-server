const {env} = process;

if (!env.CONFIG_PARAM_1) {
	throw new Error('Env var CONFIG_PARAM_1 is required');
}

class Config {
	readonly CONFIG_PARAM_1 = env.CONFIG_PARAM_1 as string;
}

export const config = new Config();
