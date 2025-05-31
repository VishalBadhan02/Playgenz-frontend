export function applyNestedUpdates(obj: any, updates: any) {
    const clone = { ...obj };
    for (const path in updates) {
        const keys = path.split(".");
        let current = clone;
        for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = { ...current[keys[i]] };
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = updates[path];
    }
    return clone;
}