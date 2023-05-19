import { Avatar } from '@mantine/core';

const Badge = ({ src, alt, size = 'lg' }) => <Avatar size={size} src={src} alt={alt} />;

export default Badge;
