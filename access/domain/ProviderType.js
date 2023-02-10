const ProviderType = {
    Moderator: 'Moderator',
    Consultant: 'Consultant',
    None: 'None',
    Both: 'Both'
};

export default ProviderType;

export function canAccessClientRecords(providerType) {
    return providerType !== ProviderType.None;
}
