const mysql = require('mysql2')
const http = require('http')
const url = require('url')
const multer = require('multer')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
// const cors = require('cors')


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'K@sc050505',  // CHANGE TO WHAT EVER PASSWORD OF THE WORKBENCH
    database: 'ompdatabase'
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../assets/listings/')
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4()
        const fileExtension = file.originalname.split('.').pop()
        cb(null, uniqueFilename + '.' + fileExtension)
    }
})
const upload = multer({ storage: storage })

// Create HTTP Server
const server = http.createServer((req, res) => {
    // Handle CORS (Cross-Origin Resource Sharing) if necessary
    // cors()(req, res, () => {});
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end()
        return
    }

    // Handle GET requests
    if (req.method === 'GET' && req.url === '/users') {
        pool.query('SELECT * FROM userdata', (err, rows) => {
            if (err) {
                console.error('Error executing query', err)
                res.writeHead(500, { 'Content-Type' : 'application/json'})
                res.end(JSON.stringify({ error: 'Internal Server Error'}))
                return
            }
            res.writeHead(200, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify(rows))
        })
    } else if (req.method === 'POST' && req.url === '/login') { // FOR LOGIN
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const { email, password } = JSON.parse(body)
            // validate username and pass
            // Query db to verify creds
            pool.query('SELECT * FROM userdata WHERE email = ? AND password = ?', [email, password], (err, results) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return
                }

                if (results.length > 0) {
                    // Userfound
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Login Successful', user: results[0]}))
                } else {
                    // User not found
                    res.writeHead(401, { 'Content-Type' : 'application/json' })
                    res.end(JSON.stringify({ error: 'Invalid username or password' }))
                }
            })
            // return appropriate response
        })
    } else if (req.method === 'POST' && req.url === '/signup') { // FOR SIGNUP
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const userdata = JSON.parse(body)
            
            // Extract user data from req body
            const {username, email, password } = userdata;

            // Insert new user into db
            pool.query('INSERT INTO userdata (userName, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type' : 'application/json'})
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return;
                }

                res.writeHead(201, { 'Content-Type' : 'application.json'})
                res.end(JSON.stringify({ message: 'User created Successfully'}))
            })
            // return appropriate response
        })
    } else if (req.method === 'GET' && req.url === '/getLoggedInUser') {
        const userId = req.headers['user-id'];
        
        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User ID not provided' }));
            return;
        }
    
        pool.query('SELECT * FROM userdata WHERE userID = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error executing query', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
    
            if (results.length > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results[0]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User not found' }));
            }
        });
    } else if (req.method === 'POST' && req.url === '/updateUsername') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const { username } = JSON.parse(body)
            const userId = req.headers['user-id'];
            
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User ID not provided' }));
                return;
            }
        
            pool.query('UPDATE userdata SET userName = ? WHERE userID = ?', [username, userId], (err, result) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return;
                }
        
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Username updated successfully' }))
            })
        })
    } else if (req.method === 'POST' && req.url === '/updateEmail') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const { email } = JSON.parse(body)
            const userId = req.headers['user-id'];
            
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User ID not provided' }));
                return;
            }
        
            pool.query('UPDATE userdata SET email = ? WHERE userID = ?', [email, userId], (err, result) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return;
                }
        
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Email updated successfully' }))
            })
        })
    } else if (req.method === 'POST' && req.url === '/updateAddress') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const { address } = JSON.parse(body)
            const userId = req.headers['user-id'];
            
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User ID not provided' }));
                return;
            }
        
            pool.query('UPDATE userdata SET address = ? WHERE userID = ?', [address, userId], (err, result) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return;
                }
        
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Address updated successfully' }))
            })
        })
    } else if (req.method === 'POST' && req.url === '/updatePassword') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const { password } = JSON.parse(body)
            const userId = req.headers['user-id'];
            
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User ID not provided' }));
                return;
            }
        
            pool.query('UPDATE userdata SET password = ? WHERE userID = ?', [password, userId], (err, result) => {
                if (err) {
                    console.error('Error executing query', err)
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                    return;
                }
        
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Password updated successfully' }))
            })
        })
    } else if (req.method === 'POST' && req.url === '/create-listing') {
        upload.array('item-images', 5)(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.error('Multer error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else if (err) {
                // An unknown error occurred when uploading.
                console.error('Unknown error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
    
            // File upload successful, proceed with saving listing data
            const listingData = JSON.parse(req.body.listingData);
            const userId = listingData.userID;
    
            // Extract file paths
            const filePaths = req.files.map(file => file.path);
    
            // Insert listing data into the database
            pool.query('INSERT INTO listings (itemName, itemPrice, itemDescription, userID, itemCategory) VALUES (?, ?, ?, ?, ?)',
                [listingData.itemName, listingData.itemPrice, listingData.itemDescription, userId, listingData.itemCategory],
                (err, result) => {
                    if (err) {
                        console.error('Error executing query', err)
                        res.writeHead(500, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: 'Internal Server Error' }))
                        return;
                    }
    
                    const itemId = result.insertId;
    
                    // Insert file paths into the listing_images table
                    filePaths.forEach((filePath, index) => {
                        pool.query('INSERT INTO listing_images (imagePath, itemID) VALUES (?, ?)',
                            [filePath, itemId],
                            (err, result) => {
                                if (err) {
                                    console.error('Error executing query', err)
                                    res.writeHead(500, { 'Content-Type': 'application/json' })
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }))
                                    return;
                                }
                            });
                    });
    
                    res.writeHead(201, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Listing Created Successfully' }))
                });
        });
    } else if (req.method === 'GET' && req.url.startsWith('/listings')) {
        const urlObject = url.parse(req.url, true);
        const query = urlObject.query;
        let queryStr = 'SELECT * FROM listings';
        let queryParams = [];
    
        if (query.search) {
            queryStr += ' WHERE itemName LIKE ? OR itemCategory LIKE ?';
            const searchTerm = `%${query.search}%`;
            queryParams = [searchTerm, searchTerm];
        }

        if (query.category) {
            queryStr += ' WHERE itemCategory = ?';
            queryParams.push(query.category);
        }
    
        pool.query(queryStr, queryParams, (err, rows) => {
            if (err) {
                console.error('Error executing query', err);
                res.writeHead(500, { 'Content-Type' : 'application/json'});
                res.end(JSON.stringify({ error: 'Internal Server Error'}));
                return;
            }
    
            // Fetch image paths for each listing
            const listingsWithImages = rows.map(async listing => {
                const images = await fetchListingImages(listing.itemID);
                return { ...listing, images };
            });
    
            // Wait for all image paths to be fetched
            Promise.all(listingsWithImages)
                .then(listings => {
                    res.writeHead(200, { 'Content-Type' : 'application/json'});
                    res.end(JSON.stringify(listings));
                })
                .catch(error => {
                    console.error('Error fetching listing images', error);
                    res.writeHead(500, { 'Content-Type' : 'application/json'});
                    res.end(JSON.stringify({ error: 'Internal Server Error'}));
                });
        });
    } else if (req.method === 'POST' && req.url === '/addToCart') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Request Body:', body); // Log the request body
            const { itemName, userID, itemID, itemPrice, imagePath } = JSON.parse(body);
            console.log('Parsed Body:', { itemName, userID, itemID, itemPrice, imagePath }); // Log the parsed body
            if (!itemName || !userID || !itemID || !itemPrice || !imagePath) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing required fields' }));
                return;
            }
            console.log('ItemID:', itemID);
            // Fetch itemPrice from listings table and imagePath from listing_images table
            pool.query('SELECT l.itemPrice, l.itemName, li.imagePath FROM listings l JOIN listing_images li ON l.itemID = li.itemID WHERE l.itemID = ?',
                [itemID],
                (err, rows) => {
                    if (err) {
                        console.error('Error executing query', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }
                    
                    console.log('Query result:', rows);
                    if (rows.length > 0) {
                        const { itemPrice, itemName, imagePath } = rows[0];
    
                        pool.query('INSERT INTO cart (itemName, userID, itemID, itemPrice, imagePath) VALUES (?, ?, ?, ?, ?)',
                            [itemName, userID, itemID, itemPrice, imagePath],
                            (err, result) => {
                                if (err) {
                                    console.error('Error executing query', err);
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    return;
                                }
                                console.log('Insert result:', result);
                        
                                res.writeHead(201, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Item added to cart successfully' }));
                            });
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Item not found' }));
                    }
                });
        });
    } else if (req.method === 'GET' && req.url === '/userCart') {
        const userId = req.headers['user-id']; // Extract userId from headers
        // Query the database to fetch cart data for the logged-in user
        // Replace this with your actual database query
        pool.query('SELECT * FROM cart WHERE userId = ?', [userId], (error, results) => {
            if (error) {
                console.error('Error fetching cart data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            // Send the cart data back to the client
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Items from cart successfully added', user: results}));
        });
    } else {
        // Handle other routes or methods
        res.writeHead(404, { 'Content-Type' : 'application/json'})
        res.end(JSON.stringify({ error: 'Not Found' }))
    }

    async function fetchListingImages(listingID) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT imagePath FROM listing_images WHERE itemID = ?', [listingID], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const images = rows.map(row => row.imagePath);
                    resolve(images);
                }
            });
        });
    }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})