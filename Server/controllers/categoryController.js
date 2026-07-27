
// @access  Private (e.g., Admin only, but `protect` is used)
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        res.status(201).json({ message: `Category '${name}' created successfully (placeholder)` });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
     
        res.status(200).json({
            message: 'All categories fetched successfully (placeholder)',
            categories: [
                { id: '1', name: 'Technology' },
                { id: '2', name: 'Lifestyle' }
            ]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({ message: `Category with ID ${id} deleted successfully (placeholder)` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};