module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {

    console.log('yaml---')
    console.log(yaml)

    notify("MiXin 解析：", url, false);
    const content = yaml.parse(raw)
    // console.log(obj)

    proxies = [];
    for (let proxy of content.proxies) {
        if (proxy.server === undefined) continue;
        if (proxy.name.indexOf('香港') !== -1) {
            proxies.push(proxy.name);
        }
    }
    if (proxies.length > 0) {
        content['proxy-groups'].push({
            'name': '🇭🇰香港负载均衡',
            'type': 'load-balance',
            'proxies': proxies,
            'url': 'http://cp.cloudflare.com/generate_204',
            'interval': 300,
            'strategy': 'consistent-hashing'
        });
        content['proxy-groups'][0].proxies.unshift("🇭🇰香港负载均衡");
    }

    return yaml.stringify(content)
}
