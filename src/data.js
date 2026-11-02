export const monthly = [35, 57, 46, 51, 60, 66, 44, 69, 55, 66, 88, 34]
export const revenue = [72, 73, 75, 70, 76, 77, 78, 77, 79, 80, 78, 76, 77, 79, 79, 81, 80, 81, 82, 83, 84, 86, 80, 85, 87, 87, 87, 86, 88, 90, 92]
export const orders = [48, 54, 51, 56, 46, 44, 60, 63, 57, 52, 50, 55, 49, 61, 65, 60, 68, 64, 72, 55, 70, 66, 68, 62, 75, 78, 82, 74, 69, 67]
export const marketing = [23.5, 24.4, 20.1, 21.2, 22.2, 20.6, 21.7, 22.8, 21.4, 19.4, 20.3, 21.4, 19.9, 20.7, 21.8, 20.2, 18.3, 19.2, 17.7, 18.8, 19.7, 20.7, 19.3, 17.3, 18.3, 16.9, 18, 19.1, 17.8, 18.9, 17.1]
export const hourly = [24, 35, 31, 38, 36, 42, 49, 35, 51, 44, 52, 48, 61, 58, 65, 72, 46, 53, 60, 68, 49, 65, 57, 63]
export const sales = [13.5, 15.4, 13, 11.1, 12.9, 14.1, 9.8, 8.6, 14.2, 12.8, 11.1, 14.1, 14.1, 11.1, 8.7, 17.2, 14.9, 12.4, 13, 15.2, 13.1, 9.1, 14.8, 17.1, 15.9, 14.2, 12.9, 15.1, 13.7, 10.8, 13.5]
export const traffic = [['Organic search', '4.12K', 74], ['Direct', '2.89K', 52], ['Referral', '1.64K', 30], ['Paid social', '980', 18], ['Email', '620', 12]]
export const transactions = [
 ['04910', 'Ryan Korsgaard', 'Ergo Office Chair', 'Success', 12, 3450],
 ['04911', 'Madelyn Lubin', 'Sunset Desk 02', 'Success', 20, 2180],
 ['04912', 'Abram Bergson', 'Eco Bookshelf', 'Pending', 22, 1750],
 ['04913', 'Phillip Mango', 'Green Leaf Desk', 'Refunded', 6, 3250],
 ['04914', 'Sophie Martins', 'Flex Monitor Arm', 'Success', 15, 890],
 ['04915', 'James Caldwell', 'Walnut Standing Desk', 'Pending', 8, 4200],
 ['04916', 'Elena Vasquez', 'Mesh Task Chair Pro', 'Success', 4, 520],
 ['04917', 'Marcus Chen', 'Cable Management Tray', 'Success', 30, 45]
]
export const deployments = [
 ['2.8.1','Production','Healthy','main','Improve edge cache invalidation strategy','May 19','Cached'],
 ['2.8.0','Production','Stable','release/2.8','Patch payment webhook retry logic','May 18','Cached'],
 ['2.9.0-rc.1','Staging','Warning','release/2.9','Add budget dashboard summary cards','May 18','Cold'],
 ['2.7.6','Production','Healthy','hotfix/auth-session','Fix stale session token refresh race','May 17','Cached'],
 ['2.9.0-beta.3','Staging','Stable','feature/usage-breakdown','Refine monthly budget usage graph labels','May 17','Cold'],
 ['2.6.9','Production','Healthy','main','Update observability tags for API gateway','May 16','Cached'],
 ['3.0.0-alpha.2','Development','Warning','next/core-rewrite','Enable route-level response compression','May 16','Cold'],
 ['2.8.2','Production','Stable','hotfix/cache-headers','Correct CDN cache-control header mismatch','May 15','Cached'],
 ['2.9.0-beta.4','Staging','Healthy','feature/metrics-panel','Add p95 request duration KPI tile','May 15','Cold'],
 ['3.0.0-alpha.3','Development','Stable','next/runtime-v2','Prototype runtime sandbox isolation','May 14','Cold']
]
export function money(n) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n) }
